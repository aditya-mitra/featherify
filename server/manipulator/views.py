from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ParseError

from .helpers.get_feather_image import get_feather_images
from .serializers import ManipulatorSerializer


class ManipulatorView(APIView):

    # parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        custom_data = {"company": "mahindra", "car": "scorpio"}
        return Response(data=custom_data)

    def post(self, request, format=None):

        serializer = ManipulatorSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        # should be refactored into a serializer

        urls = serializer.validated_data.get("urls")

        image_files = serializer.validated_data.get("images")

        width = serializer.validated_data.get("width")
        height = serializer.validated_data.get("height")

        config = serializer.validated_data.get("config")

        results = get_feather_images(
            files=image_files, urls=urls, width=width, height=height, config=config
        )

        return Response(data=results)
