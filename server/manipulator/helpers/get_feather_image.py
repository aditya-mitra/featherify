from typing import Dict
from io import BytesIO


from django.core.files.uploadedfile import InMemoryUploadedFile
from requests import exceptions as requestexecptions
from requests import get as requestget

from .get_valid_file_and_url import get_file_data
from .process_image import get_image_css


def get_image_css_from_file(
    file: InMemoryUploadedFile, width: int, height: int
) -> Dict[str, str]:

    file_data = get_file_data(file)

    print(file_data, "is the file data")

    output = {}

    if "error" in file_data:
        output["error"] = file_data.get("error")

    else:

        try:
            output["styles"] = get_image_css(file_data.get("file"), width, height)
            output["name"] = file_data.get("name")
        except:
            output["error"] = "problem processing file - {}".format(
                file_data.get("name")
            )

    return output


def get_image_css_from_url(url: str, width: int, height: int) -> Dict[str, str]:

    output = {}

    try:
        response = requestget(url)
        image_bytes = BytesIO(response.content)
        output["styles"] = get_image_css(image_bytes, width, height)
        output["name"] = url

    except requestexecptions.RequestException as e:
        output["error"] = "request for the url - {}".format(e)

    except:
        output["error"] = "problem processing url - {}".format(url)

    return output
