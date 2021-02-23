from uuid import uuid4
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

        # should be refactored into a serializer

        urls = (
            type(request.data.get("urls")) == "list" and request.data.get("urls")
        ) or []

        image_files = (
            "images" in request.data and request.FILES.getlist("images")
        ) or []

        # IMPORTANT: get the integer height and width in a serializer with the correct condition of < 30

        width = (
            request.data.get("width") and int(request.data.get("width")) <= 35
        ) or 10
        height = (
            request.data.get("height") and int(request.data.get("height")) <= 35
        ) or 10

        print(width, height)

        resp = []

        for file_data in image_files:
            res = get_image_css_from_file(file_data, width, height)
            res["uuid"] = uuid4()
            resp.append(res)

        for url in urls:
            res = get_image_css_from_url(urls, width, height)
            res["uuid"] = uuid4()
            resp.append(res)

        return Response(data=resp)
