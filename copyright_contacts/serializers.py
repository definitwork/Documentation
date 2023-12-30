from rest_framework import serializers

from copyright_contacts.models import Copyright


class CopyrightSerializers(serializers.ModelSerializer):
    class Meta:
        model = Copyright
        fields = ['site_name',
                  'owner_name',
                  'unp',
                  'country',
                  'postcode',
                  'city',
                  'street',
                  'house'
                  ]
