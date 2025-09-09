<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\House
 *
 * @property int $id
 * @property string $address
 * @property string $owner_name
 * @property string|null $owner_phone
 * @property string $uninhabitable_criteria
 * @property string|null $description
 * @property int $assessment_score
 * @property float|null $latitude
 * @property float|null $longitude
 * @property string $status
 * @property int $surveyor_id
 * @property int|null $validator_id
 * @property \Illuminate\Support\Carbon|null $validated_at
 * @property string|null $validation_notes
 * @property string|null $district
 * @property string|null $village
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $surveyor
 * @property-read \App\Models\User|null $validator
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\HousePhoto> $photos
 * @property-read int|null $photos_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|House newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|House newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|House query()
 * @method static \Illuminate\Database\Eloquent\Builder|House whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereAssessmentScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereDistrict($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereOwnerName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereOwnerPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereSurveyorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereUninhabitableCriteria($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereValidatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereValidationNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereValidatorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House whereVillage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|House pending()
 * @method static \Illuminate\Database\Eloquent\Builder|House valid()
 * @method static \Illuminate\Database\Eloquent\Builder|House repaired()
 * @method static \Database\Factories\HouseFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class House extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'address',
        'owner_name',
        'owner_phone',
        'uninhabitable_criteria',
        'description',
        'assessment_score',
        'latitude',
        'longitude',
        'status',
        'surveyor_id',
        'validator_id',
        'validated_at',
        'validation_notes',
        'district',
        'village',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'assessment_score' => 'integer',
        'latitude' => 'float',
        'longitude' => 'float',
        'validated_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the surveyor who recorded this house.
     */
    public function surveyor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'surveyor_id');
    }

    /**
     * Get the validator who validated this house.
     */
    public function validator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'validator_id');
    }

    /**
     * Get the photos for this house.
     */
    public function photos(): HasMany
    {
        return $this->hasMany(HousePhoto::class);
    }

    /**
     * Scope a query to only include pending houses.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include valid houses.
     */
    public function scopeValid($query)
    {
        return $query->where('status', 'valid');
    }

    /**
     * Scope a query to only include repaired houses.
     */
    public function scopeRepaired($query)
    {
        return $query->where('status', 'repaired');
    }
}