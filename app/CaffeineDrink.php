<?php
/**
 * Created by PhpStorm.
 * User: andresabello
 * Date: 8/24/18
 * Time: 12:07 AM
 */

namespace App;


use Illuminate\Database\Eloquent\Model;

class CaffeineDrink extends Model
{
    protected $table = 'caffeine_drinks';

    protected $fillable = [
        'name', 'level', 'description'
    ];
}