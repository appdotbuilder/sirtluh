<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHouseRequest extends FormRequest
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
            'address' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'owner_phone' => 'nullable|string|max:20',
            'uninhabitable_criteria' => 'required|string',
            'description' => 'nullable|string',
            'assessment_score' => 'required|integer|min:1|max:100',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'district' => 'nullable|string|max:100',
            'village' => 'nullable|string|max:100',
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
            'address.required' => 'Alamat rumah wajib diisi.',
            'owner_name.required' => 'Nama pemilik wajib diisi.',
            'uninhabitable_criteria.required' => 'Kriteria ketidaklayakan wajib diisi.',
            'assessment_score.required' => 'Skor penilaian wajib diisi.',
            'assessment_score.min' => 'Skor penilaian minimal 1.',
            'assessment_score.max' => 'Skor penilaian maksimal 100.',
            'latitude.between' => 'Latitude harus antara -90 dan 90.',
            'longitude.between' => 'Longitude harus antara -180 dan 180.',
        ];
    }
}