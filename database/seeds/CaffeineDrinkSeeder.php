<?php

use Illuminate\Database\Seeder;

class CaffeineDrinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\CaffeineDrink::create([
            'name' => 'Monster Ultra Sunrise',
            'level' => 75,
            'description' => ''
        ]);
        \App\CaffeineDrink::create([
            'name' => 'Black Coffee',
            'level' => 95,
            'description' => ''
        ]);
        \App\CaffeineDrink::create([
            'name' => 'Americano',
            'level' => 77,
            'description' => ''
        ]);
        \App\CaffeineDrink::create([
            'name' => 'Sugar Free NOS',
            'level' => 130,
            'description' => ''
        ]);
        \App\CaffeineDrink::create([
            'name' => '5 hour energy',
            'level' => 200,
            'description' => ''
        ]);
    }
}
