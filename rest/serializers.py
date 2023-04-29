from rest_framework import serializers
from log.models import RideDetail
from bike.models import BikeDetail, Wheelsets, Maintenance



class RideSerializer(serializers.ModelSerializer):
	class Meta:
		model = RideDetail
		fields = '__all__'

class BikeSerializer(serializers.ModelSerializer):
	class Meta:
		model = BikeDetail
		fields = '__all__'

class WheelsetSerializer(serializers.ModelSerializer):
	class Meta:
		model = Wheelsets
		fields = '__all__'

class MaintenanceSerializer(serializers.ModelSerializer):
	class Meta:
		model = Maintenance
		fields = '__all__'

