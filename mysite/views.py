from django.shortcuts import render_to_response
from django.shortcuts import RequestContext
from django.shortcuts import render


def test(request):
    return render_to_response('test.html', locals(), context_instance=RequestContext(request))
    #return render('test.html')
