from PIL import Image
from io import BytesIO
from requests import get as requestget, exceptions as requestexecptions
from django.core.files.uploadedfile import InMemoryUploadedFile
from typing import List, Dict, Tuple, AnyStr


def get_rows(pixels: List[Tuple], width: int) -> List[List[Tuple]]:
    return [pixels[x : x + width] for x in range(0, len(pixels), width)]


def get_image_data(file_content: BytesIO, width: int, height: int) -> dict:

    im = Image.open(file_content)
    resized_image = im.resize((width, height))

    image_data = {}

    pixels: List[Tuple] = list(resized_image.getdata())

    rows = get_rows(pixels, width)

    no_of_channels = len(resized_image.getbands())

    image_data["pixels"] = pixels
    image_data["rows"] = rows
    image_data["channels"] = no_of_channels

    return image_data


def get_linear_gradient(rows: List[List[Tuple]]) -> List[AnyStr]:
    linear_gradients: List[AnyStr] = []

    for row in rows:
        """
        we will store each of rgbs as 'linear-gradient(90deg, rgb(10,43,83) 10% 20%, rgb(39, 20, 58)) 20% )'
        """
        rgbs: List[AnyStr] = []  # we need its length, so we store it the rgbs in a list

        for t in row:
            rgb_vals = ",".join(map(str, t))  # produces - 10,43,83
            rgb_str = "rgb({})".format(rgb_vals)  # produces - rgb(10,43,83)
            rgbs.append(rgb_str)

        gradients: List[AnyStr] = []

        for i in range(0, len(rgbs)):
            """
            we are getting the list of gradients (as [rgb(10,43,83) 10% 20%, rgb(39, 45, 58)) 20% 30%])
            this is because of [composition of linear gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient()#composition_of_a_linear_gradient)
            """
            a = (i / len(rgbs)) * 100.0
            start = "{}%".format((i / len(rgbs)) * 100.0)
            end = "{}%".format(((i + 1) / len(rgbs)) * 100.0)
            gradient = "{0} {1} {2}".format(rgbs[i], start, end)
            gradients.append(gradient)

        gradients = ", ".join(
            gradients
        )  # produces - rgb(10,43,83) 10% 20%, rgb(39, 45, 58))

        linear_gradients.append("linear-gradient(90deg, {})".format(gradients))

    return linear_gradients


def get_image_size(gradients: List[AnyStr]) -> str:
    return "100% {}%".format(100.00 / len(gradients))


def get_image_position(gradients: List[AnyStr]) -> str:
    positions = [
        "0 {}%".format(i / (len(gradients) - 1) * 100.00)
        for i in range(0, len(gradients))
    ]
    return ",".join(positions)


def get_image_css(content: BytesIO, width: int, height: int) -> Dict[str, str]:

    im_data = get_image_data(content, width, height)
    im_rows = im_data.get("rows")
    im_gradient = get_linear_gradient(im_rows)

    return {
        "backgroundImage": ",".join(im_gradient),
        "backgroundPosition": get_image_position(im_gradient),
        "backgroundSize": get_image_size(im_gradient),
    }


def get_image_css_from_file(
    file_data: InMemoryUploadedFile, width=15, height=15
) -> Dict[str, str]:
    output = {"name": file_data.name}

    try:
        output["styles"] = get_image_css(file_data.file)
    except:
        output["error"] = "problem processing file - {}".format(file_data.name)

    return output


def get_image_css_from_url(url: str, width=15, height=15) -> Dict[str, str]:
    output = {"name": url}

    try:
        response = requestget(url)
        image_bytes = BytesIO(response.content)
        output["styles"] = get_image_css(image_bytes, width, height)

    except requestexecptions.RequestException as e:
        output["error"] = "request for the url - {}".format(e)

    except:
        output["error"] = "problem processing url - {}".format(url)

    return output
