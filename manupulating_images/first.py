from PIL import Image

# store the image in a variable to start manipulating
im = Image.open("rollercoaster.jpg")

# resize the image to decrease the number of pixels

width: int = 10
height: int = 10
resized_image = im.resize((width, height))

# get the pixels

pixels = list(resized_image .getdata())

print(pixels) 

# get the number of channels

no_of_channels:int = len(resized_image.getbands)

print('the no of channels are',no_of_channels)