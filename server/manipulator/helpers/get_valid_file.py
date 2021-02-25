from django.core.files.uploadedfile import InMemoryUploadedFile


def get_file_data(file: InMemoryUploadedFile) -> dict:

    file_data = {}

    if type(file_data) == "str":
        error = "{} is not a valid file".format(file)
        file_data["error"] = error

    else:
        file_data["name"] = file.name
        file_data["file"] = file.file

    return file_data