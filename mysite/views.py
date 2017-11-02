from django.shortcuts import render


def test(request):
    return render(request, 'test.html')


def static(request):
    print '#########################'
    print dir(request)
    return render(request, 'test.html')
