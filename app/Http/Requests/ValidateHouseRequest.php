<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ValidateHouseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => 'required|in:valid,rejected',
            'validation_notes' => 'required|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'status.required' => 'Status validasi wajib dipilih.',
            'status.in' => 'Status validasi harus berupa valid atau rejected.',
            'validation_notes.required' => 'Catatan validasi wajib diisi.',
            'validation_notes.max' => 'Catatan validasi maksimal 1000 karakter.',
        ];
    }
}