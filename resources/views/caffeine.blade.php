@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="col-md-12">
            <input type="hidden" id="user-token" value="{{ auth()->user()->api_token }}">
            <div id="caffeine-app"></div>
        </div>
    </div>
@endsection
