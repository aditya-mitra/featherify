from PIL import Image
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.exceptions import ParseError


class ManipulatorView(APIView):

    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        custom_data = {"company": "mahindra", "car": "scorpio"}
        return Response(data=custom_data)

    def post(self, request, format=None):

        if "images" not in request.data and "urls" not in request.data:
            raise ParseError(detail="Neither urls nor images were not provided")

        print(request.data, "are the files")

        print("\n =====\n", request.FILES)

        for file in request.FILES.getlist("images"):
            try:
                img = Image.open(file)
                img.verify()
            except:
                print("skipping", file.name)

        custom_resp = {"done": True}
        return Response(data=custom_resp)