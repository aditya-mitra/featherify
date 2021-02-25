from base64 import b64decode, b64encode
from io import BytesIO
from PIL import Image, ImageEnhance
from typing import List, Tuple, AnyStr
from pprint import pprint  # for nicely displaying the output


def get_image_data() -> dict:
    im = Image.open("rollercoaster.jpg")

    width: int = 30
    height: int = 30
    format = im.format
    rsimg = im.resize((width, height))

    enhancer = ImageEnhance.Color(rsimg)
    newimg = enhancer.enhance(2)

    buffered = BytesIO()
    
    newimg.save(buffered, format=format)

    imgasstring = b64encode(buffered.getvalue()).decode()

    print("the string is", imgasstring)


def main():
    get_image_data()

if __name__ == "__main__":
    main()
