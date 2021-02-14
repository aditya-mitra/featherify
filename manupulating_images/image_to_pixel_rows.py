from PIL import Image
from typing import List, Tuple
from pprint import pprint  # for nicely displaying the output


def get_rows(pixels: List[Tuple], width: int) -> List[List[Tuple]]:
    return [pixels[x : x + width] for x in range(0, len(pixels), width)]


def main():
    # store the image in a variable to start manipulating
    im = Image.open("rollercoaster.jpg")

    # resize the image to decrease the number of pixels

    width: int = 10
    height: int = 10
    resized_image = im.resize(
        (width, height)
    )  # TODO: apply image filter for upscaling - https://pillow.readthedocs.io/en/stable/handbook/concepts.html#filters

    # get the pixels

    pixels: List[Tuple] = list(resized_image.getdata())

    # print(pixels)

    rows = get_rows(pixels, width)
    pprint(rows)

    # get the number of channels

    no_of_channels: int = len(resized_image.getbands())

    print("the no of channels are", no_of_channels)


if __name__ == "__main__":
    main()
