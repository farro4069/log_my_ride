from django.db import models
from django.contrib.auth.models import User
from bike.models import BikeDetail, Wheelsets





class RideDetail(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	bike_name = models.ForeignKey(BikeDetail, on_delete=models.CASCADE, null=True)
	wheelset = models.ForeignKey(Wheelsets, on_delete=models.CASCADE, null=True)
	ride_date = models.DateField(blank=True, help_text="Ride date")
	ride_name = models.CharField(max_length=100, help_text="Route description")
	ride_distance = models.DecimalField(max_digits=5, decimal_places=1, help_text='Distance in km')
	ride_time = models.IntegerField(help_text="Ride time in minutes")
	ride_tss = models.IntegerField(help_text="Training Stress Score")
	ride_comment = models.TextField(blank=True, null=True, help_text="Optional comments") 

	def __str__(self):
		return self.ride_name

	def get_update_url(self):
		return '/ride/{}/update'.format(self.pk)

