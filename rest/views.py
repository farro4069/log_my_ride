from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import View

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

from bike.models import BikeDetail, Wheelsets, Maintenance
from log.models import RideDetail
from rest.serializers import RideSerializer, BikeSerializer, WheelsetSerializer, MaintenanceSerializer

# Create your views here.


class ApiData(APIView):
	authentication_classes = (SessionAuthentication, BasicAuthentication)
	permission_classes = (IsAuthenticated,)

	def get(self, request, format=None):

		rides = RideDetail.objects.filter(user=request.user)
		rideSerializer = RideSerializer(rides, many=True)
		rideData = rideSerializer.data;

		bikes = BikeDetail.objects.filter(user=request.user)
		bikeSerializer = BikeSerializer(bikes, many=True)
		bikeData = bikeSerializer.data

		wheelset = Wheelsets.objects.filter(user=request.user)
		wheelSerializer = WheelsetSerializer(wheelset, many=True)
		wheelData = wheelSerializer.data

		maintenance = Maintenance.objects.filter(user=request.user)
		maintenanceSerializer = MaintenanceSerializer(maintenance, many=True)
		maintenanceData = maintenanceSerializer.data

		context = {
			"rideData": rideData, 
			"bikeData": bikeData, 
			"wheelData": wheelData,
			"maintenanceData": maintenanceData
		}

		return JsonResponse(context, safe=False)

