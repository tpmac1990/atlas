from django.contrib.gis.db import models

# ###############################################################################
# Tenement & Occurrence

class State(models.Model):
    code = models.CharField(max_length=5, primary_key=True)
    name = models.CharField(max_length=40, blank=False, null=False)

# ##################

class Shore(models.Model):
    code = models.CharField(max_length=3, primary_key=True)
    name = models.CharField(max_length=30, blank=False, null=False)

# ##################

class MaterialCategory(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)

# material_category m2m { _id, material_code, category_id}
class Material(models.Model):
    code = models.CharField(max_length=6, primary_key=True)
    name = models.CharField(max_length=50, blank=False, null=False)
    category = models.ManyToManyField(MaterialCategory, related_name="category_material", blank=True)

    def natural_key(self):
        return (self.name)

# ##################

class LocalGovernment(models.Model):
    name = models.CharField(max_length=70, blank=False, null=False)
    # state = models.CharField(max_length=10, blank=False, null=False)

class GovernmentRegion(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    # state = models.CharField(max_length=10, blank=False, null=False)

class GeologicalProvince(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    ptype = models.CharField(max_length=70, blank=True, null=True)
    rank = models.CharField(max_length=70, blank=True, null=True)

# ##################
# Occurrence Only

class OccTypeSimp(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)

class OccType(models.Model):
    original = models.CharField(max_length=50, blank=False, null=False)
    simple = models.ForeignKey(OccTypeSimp, on_delete=models.SET_NULL, related_name="simple_occtype", blank=True, null=True)

    def natural_key(self):
        return (self.original)

# ##################

class OccStatusSimp(models.Model):
    name = models.CharField(max_length=50, blank=False, null=False)

class OccStatus(models.Model):
    original = models.CharField(max_length=50, blank=False, null=False)
    simple = models.ForeignKey(OccStatusSimp, on_delete=models.SET_NULL, related_name="simple_occstatus", blank=True, null=True)

    def natural_key(self):
        return (self.original)

# ##################

class OccName(models.Model):
    name = models.CharField(max_length=130, blank=False, null=False)

    def natural_key(self):
        return (self.name)

# ##################

class OccOriginalID(models.Model):
    code = models.CharField(primary_key=True, max_length=20, blank=False, null=False)

# ##################

class OccSize(models.Model):
    code = models.CharField(primary_key=True, max_length=3, blank=False, null=False)
    name = models.CharField(max_length=20, blank=False, null=False)


# occurrence_majmat m2m { _id, occid, majmat_id}
# occurrence_minmat m2m { _id, occid, minmat_id}
# occurrence_typ m2m { _id, occid, type_id}
# occurrence_oid m2m { _id, occid, oid_id}
# occurrence_name m2m { _id, occid, name_id}
class Occurrence(models.Model):
    ind = models.CharField(max_length=14, blank=False, null=False, primary_key=True)
    status = models.ForeignKey(OccStatus, related_name="status_occurrence", on_delete=models.SET_NULL, blank=True, null=True)
    size = models.ForeignKey(OccSize, related_name="size_occurrence", on_delete=models.SET_NULL, blank=True, null=True)
    state = models.ForeignKey(State, related_name="state_occurrence", on_delete=models.SET_NULL, blank=True, null=True)
    localgov = models.ForeignKey(LocalGovernment, related_name="localgov_occurrence", on_delete=models.SET_NULL, blank=True, null=True)
    govregion = models.ForeignKey(GovernmentRegion, related_name="govregion_occurrence", on_delete=models.SET_NULL, blank=True, null=True)
    geoprovince = models.ManyToManyField(GeologicalProvince, related_name="geoprovince_occurrence", blank=True,)
    typ = models.ManyToManyField(OccType, related_name="typ_occurrence", blank=True,)
    oid = models.ManyToManyField(OccOriginalID, related_name="oid_occurrence", blank=True,)
    name = models.ManyToManyField(OccName, related_name="name_occurrence", blank=True,)
    majmat = models.ManyToManyField(Material, related_name="majmat_occurrence", blank=True,)
    minmat = models.ManyToManyField(Material, related_name="minmat_occurrence", blank=True,)
    geom = models.PointField(srid=4202) 

    def __str__(self):
        return self.ind



# ###############################################################################
# Tenement Only

class TenAct(models.Model):
    code = models.CharField(max_length=20, primary_key=True)
    name = models.CharField(max_length=70, blank=False, null=False)
    state = models.CharField(max_length=10, blank=False, null=False)
    link = models.URLField(blank=True, null=True)

class TenTypeSimp(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)

# class TenTypeManager(models.Manager):
#     def get_by_natural_key(self, fname):
#         return self.get(fname=fname)

class TenType(models.Model):
    fname = models.CharField(max_length=70, blank=False, null=False)
    original = models.CharField(max_length=50, blank=False, null=False)
    act = models.ForeignKey(TenAct, on_delete=models.SET_NULL, related_name="act_tentype", blank=True, null=True)
    simple = models.ForeignKey(TenTypeSimp, on_delete=models.SET_NULL, related_name="simple_tentype", blank=True, null=True)

    # objects = TenTypeManager()

    def natural_key(self):
        return (self.fname)


# ##################

class TenStatusSimp(models.Model):
    name = models.CharField(max_length=70, blank=False, null=False)

class TenStatus(models.Model):
    original = models.CharField(max_length=100, blank=False, null=False)
    simple = models.ForeignKey(TenStatusSimp, on_delete=models.SET_NULL, related_name="simple_tenstatus", blank=True, null=True)

    def natural_key(self):
        return (self.original)

# ##################

class TenOriginalID(models.Model):
    code = models.CharField(primary_key=True, max_length=22, blank=False, null=False)


# ##################

class Exchange(models.Model):
    code = models.CharField(primary_key=True, max_length=5)
    name = models.CharField(max_length=50, blank=False, null=False)
    city = models.CharField(max_length=50, blank=False, null=False)
    country = models.CharField(max_length=50, blank=False, null=False)

class Listed(models.Model):
    ticker = models.CharField(max_length=6, blank=False, null=False)
    exchange = models.ForeignKey(Exchange, on_delete=models.SET_NULL, related_name="exchange_listed", blank=True, null=True)

class HolderType(models.Model):
    original = models.CharField(max_length=30, blank=False, null=False)
    code = models.CharField(max_length=10, blank=True, null=True)

class HolderPosition(models.Model):
    name = models.CharField(max_length=20, blank=False, null=False)

# holder_listed m2m { _id, holder_id, listed_id } not sure about this!
class Holder(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    typ = models.ForeignKey(HolderType, on_delete=models.SET_NULL, related_name="typ_holder", blank=True, null=True)
    listed = models.ManyToManyField(Listed, related_name="listed_holder", blank=True)

class Parent(models.Model):
    name = models.ForeignKey(Holder, on_delete=models.SET_NULL, related_name="name_holderrelation", blank=True, null=True)
    child = models.ForeignKey(Holder, on_delete=models.SET_NULL, related_name="child_holderrelation", blank=True, null=True)
    percown = models.FloatField()

    class Meta:
        unique_together = ('name', 'child',)

# ##################

class TenHolder(models.Model):
    percown = models.FloatField()
    name = models.ForeignKey(Holder, on_delete=models.SET_NULL, related_name="name_tenholder", blank=True, null=True)
    position = models.ForeignKey(HolderPosition, on_delete=models.SET_NULL, related_name="position_tenholder", blank=True, null=True)

    def natural_key(self):
        return (self.name.name)


# tenement_oid m2m { _id, tenid, TenOriginalID}
# tenement_holder m2m { _id, tenid, holder_id}
# tenement_occurrence m2m { _id, tenid, occurrence_id}
# tenement_majmat m2m { _id, tenid, majmat_id}
# tenement_minmat m2m { _id, tenid, minmat_id}
# tenement_localgov m2m { _id, tenid, localgov_id}
# tenement_govregion m2m { _id, tenid, govregion_id}
# tenement_geoprovince m2m { _id, tenid, geoprovince_id}
class Tenement(models.Model):
    ind = models.CharField(max_length=16, primary_key=True)
    typ = models.ForeignKey(TenType, on_delete=models.SET_NULL, related_name="typ_tenement", blank=True, null=True)
    status = models.ForeignKey(TenStatus, on_delete=models.SET_NULL, related_name="status_tenement", blank=True, null=True)
    state = models.ForeignKey(State, on_delete=models.SET_NULL, related_name="state_tenement", blank=True, null=True)
    shore = models.ForeignKey(Shore, on_delete=models.SET_NULL, related_name="shore_tenement", blank=True, null=True)
    lodgedate = models.DateField(blank=False, null=False)
    startdate = models.DateField(blank=False, null=False)
    enddate = models.DateField(blank=False, null=False)
    localgov = models.ManyToManyField(LocalGovernment, related_name="localgov_tenement", blank=True)
    govregion = models.ManyToManyField(GovernmentRegion, related_name="govregion_tenement", blank=True)
    geoprovince = models.ManyToManyField(GeologicalProvince, related_name="geoprovince_tenement", blank=True)
    oid = models.ManyToManyField(TenOriginalID, related_name="oid_tenement", blank=True)
    holder = models.ManyToManyField(TenHolder, related_name="holder_tenement", blank=True)
    occurrence = models.ManyToManyField(Occurrence, related_name="occurrence_tenement", blank=True)
    majmat = models.ManyToManyField(Material, related_name="majmat_tenement", blank=True)
    minmat = models.ManyToManyField(Material, related_name="minmat_tenement", blank=True)
    geom = models.MultiPolygonField(srid=4202)

    def __str__(self):
        return self.ind
