<?php

namespace App\Http\Controllers;

use App\CaffeineDrink;
use App\Http\Requests\ProcessDrinksRequest;

class CaffeineController extends Controller
{
    protected $safeCaffeineLevel = 500;

    public function index()
    {
        return view('caffeine');
    }

    public function all()
    {
        $caffeineDrinks = CaffeineDrink::all();
        return response()->json(['drinks' => $caffeineDrinks]);
    }

    public function process(ProcessDrinksRequest $processDrinksRequest)
    {
        $selectedDrinks = $processDrinksRequest->input('selected_drinks');
        $drinkCollection = collect($selectedDrinks);

        $drinkCollection->map(function($drink){
           return CaffeineDrink::find($drink['id']);
        });

        $totalCaffeine = $drinkCollection->sum(function ($drink) {
            return $drink['level'] * $drink['quantity'];
        });

        $remainingAvailableCaffeine = $this->safeCaffeineLevel - $totalCaffeine;

        if ($remainingAvailableCaffeine <= 0) {
            return response()->json([
                'message' => 'Exceeded safe levels of caffeine ' . $this->safeCaffeineLevel,
                'remaining' => $remainingAvailableCaffeine,
                'total_caffeine' => $totalCaffeine,
            ], 422);
        }

        return response()->json([
            'selected_drinks' => $selectedDrinks,
            'total_caffeine' => $totalCaffeine,
            'remaining' => $remainingAvailableCaffeine
        ]);
    }
}
