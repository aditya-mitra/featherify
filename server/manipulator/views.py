from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ParseError

from .helpers.process_image import get_image_css_from_file, get_image_css_from_url


class ManipulatorView(APIView):

    # parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        custom_data = {"company": "mahindra", "car": "scorpio"}
        return Response(data=custom_data)

    def post(self, request, format=None):

        print(request.data)

        if "images" not in request.data and "urls" not in request.data:
            raise ParseError(detail="Neither urls nor images were not provided")

        urls = (
            "urls" in request.data
            and type(request.data.get("urls")) == "list"
            and request.data.get("urls")
        ) or []

        image_files = (
            "images" in request.data and request.FILES.getlist("images")
        ) or []

        resp = []

        for file_data in image_files:
            css = get_image_css_from_file(file_data)
            resp.append(css)

        for url in urls:
            css = get_image_css_from_url(request.data.get("urls"))
            resp.append(css)

        return Response(data=resp)
