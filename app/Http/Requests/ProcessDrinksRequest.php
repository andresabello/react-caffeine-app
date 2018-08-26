<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProcessDrinksRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user('api');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'selected_drinks' => 'required|array',
            'selected_drinks.*.quantity' => 'required|gt:0',
            'selected_drinks.*.name' => 'required',
            'selected_drinks.*.index' => 'required',
        ];
    }
}
