from PIL import Image
from typing import List, Tuple, AnyStr
from pprint import pprint  # for nicely displaying the output


def get_rows(pixels: List[Tuple], width: int) -> List[List[Tuple]]:
    return [pixels[x : x + width] for x in range(0, len(pixels), width)]


def get_image_data() -> dict:
    im = Image.open("rollercoaster.jpg")

    width: int = 10
    height: int = 10
    resized_image = im.resize((width, height))

    image_data: dict = {}

    pixels: List[Tuple] = list(resized_image.getdata())

    rows = get_rows(pixels, width)

    no_of_channels: int = len(resized_image.getbands())

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


def get_image_position(gradients: List[AnyStr]) -> str:
    positions = [
        "0 {}%".format(i / (len(gradients) - 1) * 100.00)
        for i in range(0, len(gradients))
    ]
    return ",".join(positions)


def main():
    image_data = get_image_data()
    rows: List[List[Tuple]] = image_data.get("rows")
    gradients = get_linear_gradient(rows)

    positions = get_image_position(gradients)
    print(positions, "is the position")


if __name__ == "__main__":
    main()
