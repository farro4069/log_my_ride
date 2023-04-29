from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from user import views
from log.views import Dashboard

urlpatterns = [
    path('', views.login_view,),
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('log/', include('log.urls')),
    path('ride/', include('log.urls')),
    path('bike/', include('bike.urls')),
    path('rest/', include('rest.urls')),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
