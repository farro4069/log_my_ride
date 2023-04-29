from django.contrib import admin
from log.models import RideDetail


class RideAdmin(admin.ModelAdmin):
	list_display = ("ride_date", "ride_name")
# Register your models here.
admin.site.register(RideDetail, RideAdmin)


