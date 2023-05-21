from django import forms
from django.forms import ModelForm
from django.contrib.auth.models import User
from bike.models import BikeDetail, Wheelsets, Maintenance
from log.models import RideDetail

# Add argument to allow optional comments

class RideLogForm(forms.ModelForm):
	wheelset = forms.ModelChoiceField(queryset=Wheelsets.objects.filter(date_sold__isnull=True), empty_label=None)
	bike_name = forms.ModelChoiceField(queryset=BikeDetail.objects.filter(date_sold__isnull=True), empty_label=None)
	ride_comment = forms.CharField(widget=forms.Textarea(attrs={"rows": "2"}))

	class Meta:
		model = RideDetail
		fields = [
			'ride_date', 
			'ride_name',
			'ride_distance',
			'ride_time',
			'ride_tss',
			'ride_comment',
			'bike_name',
			'wheelset'
			]

	def __init__(self, *args, **kwargs):
		user=kwargs.pop('user', None)
		super().__init__(*args, **kwargs)
		self.fields["ride_comment"].required = False
		if user:
			self.fields['bike_name'].queryset = BikeDetail.objects.filter(user=user, date_sold__isnull=True)
			self.fields['wheelset'].queryset = Wheelsets.objects.filter(user=user, date_sold__isnull=True)


	def clean(self, *args, **kwargs):
		user = self.cleaned_data.get('name')
		return self.cleaned_data

class RideEditForm(forms.ModelForm):
	wheelset = forms.ModelChoiceField(queryset=Wheelsets.objects.all(), empty_label=None)
	bike_name = forms.ModelChoiceField(queryset=BikeDetail.objects.all(), empty_label=None)
	ride_comment = forms.CharField(widget=forms.Textarea(attrs={"rows": "2"}))

	class Meta:
		model = RideDetail
		fields = [
			'ride_date', 
			'ride_name',
			'ride_distance',
			'ride_time',
			'ride_tss',
			'ride_comment',
			'bike_name',
			'wheelset'
			]

	def __init__(self, *args, **kwargs):
		user=kwargs.pop('user', None)
		super().__init__(*args, **kwargs)
		self.fields["ride_comment"].required = False
		if user:
			self.fields['bike_name'].queryset = BikeDetail.objects.filter(user=user, date_sold__isnull=True)
			self.fields['wheelset'].queryset = Wheelsets.objects.filter(user=user)

	def clean(self, *args, **kwargs):
		user = self.cleaned_data.get('name')
		return self.cleaned_data
