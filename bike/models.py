from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse


class BikeDetail(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	bike_name = models.CharField(max_length=40)
	bike_description = models.CharField(max_length=100)
	comments = models.TextField(null=True)
	specs = models.TextField(null=True)
	date_acquired = models.DateField(blank=True, null=True, verbose_name="Purchase date")
	date_sold = models.DateField(blank=True, null=True, verbose_name="Sale date")
	image = models.ImageField(upload_to='bike_image', null=True, blank=True)

	def __str__(self):
		return self.bike_description

	def get_absolute_url(self):
		return reverse('bike-detail', kwargs={
			'id': self.id
			})

	@property
	def get_comments(self):
		return self.maintenance.all().order_by('-date')


class Maintenance(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	date = models.DateField(blank=True, null=True)
	content = models.TextField()
	bike = models.ForeignKey(BikeDetail, related_name='maintenance', on_delete=models.CASCADE)

	def __str__(self):
		return self.content



class Wheelsets(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	wheels_name = models.CharField(max_length=40)
	comments = models.TextField(null=True)
	date_acquired = models.DateField(blank=True, null=True, verbose_name="Purchase date")
	date_sold = models.DateField(blank=True, null=True, verbose_name="Sale date")
	image = models.ImageField(upload_to='wheel_image', null=True, blank=True)
	bike = models.ManyToManyField(BikeDetail)

	def __str__(self):
		return self.wheels_name

	class Meta:
		verbose_name = 'Wheelset'
		verbose_name_plural = 'Wheelsets'

