from django import forms
from django.forms import ModelForm
from bike.models import BikeDetail, Wheelsets, Maintenance


class BikeForm(forms.ModelForm):
	comments = forms.CharField(widget=forms.Textarea(attrs={"rows": "2"}))
	specs = forms.CharField(widget=forms.Textarea(attrs={"rows": "3"}))

	class Meta:
		model = BikeDetail
		fields = [
			'bike_name',
			'bike_description',
			'date_acquired',
			'date_sold', 
			'comments',
			'specs',
			'image'
		]

	def clean(self, *args, **kwargs):
		user = self.cleaned_data.get('name')
		return self.cleaned_data

class WheelForm(forms.ModelForm):
	comments = forms.CharField(widget=forms.Textarea(attrs={"rows": "2"}))

	class Meta:
		model = Wheelsets
		fields = [
			'date_acquired',
			'wheels_name',
			'comments',
			'date_sold', 
			'image'
		]

	def clean(self, *args, **kwargs):
		user = self.cleaned_data.get('name')
		return self.cleaned_data



class MaintenanceForm(forms.ModelForm):
	content = forms.CharField(widget=forms.Textarea(attrs={"rows": "2"}))

	class Meta:
		model = Maintenance
		fields = [
			'bike',
			'date',
			'content',
		]

	def clean(self, *args, **kwargs):
		user = self.cleaned_data.get('name')
		return self.cleaned_data

