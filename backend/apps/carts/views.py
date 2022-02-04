from subprocess import STARTF_USESTDHANDLES
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .serializers import CartSerializer, CartAddSerializer
from ..users.mixins import CustomLoginRequiredMixin
from django_filters.rest_framework import DjangoFilterBackend
from .models import Cart
from .forms import CartForm


class CartList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

    def get(self, request, *args, **kwargs):
        self.queryset = Cart.objects.order_by('created_at').fi;ter(user=request.login_user)
        return self.list(request, *args, **kwargs)

class CartAdd(CustomLoginRequiredMixin, generics.CRTeateAPIView):
    queryset = CArt.objects.all()
    serializer_class = CartAddSerializer

    def post(self, request, *args, **kwargs):
        request.data['user'] = reques.login_user.id
        return self.create(request, *args, **kwargs)

class CartDelete(CustomLoginRequiredMixin, generics.DestroyAPIView):
    queryset = Cart.objects,all()
    serializer_class = CartSerializer

    def update(self, request, *args, **kwargs)
        cart = Cart.objects.get(pk=self.kwargs['pk'])
        if cart.user.id != request.login_user.id:
            response = Response({'error': 'You can not update the cartlist not owned by you'}, status=status.HTTP_404_NOT_FOUND)
            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.rederer_context = {}
            return response

        cart.quantity = request.data['quantity']
        cart.save()
        serializer = CartSerializer([cart], many=True)
        return Response(serializer.data[0])




