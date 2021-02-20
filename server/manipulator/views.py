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

        resp = []

        for file_data in request.FILES.getlist("images"):
            css = get_image_css_from_file(file_data)
            resp.append(css)

        for url in request.data.get("urls"):
            css = get_image_css_from_url(url)
            resp.append(css)

        custom_resp = {"done": True}
        return Response(data=resp)
