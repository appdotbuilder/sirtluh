<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\HousePhoto
 *
 * @property int $id
 * @property int $house_id
 * @property string $filename
 * @property string $original_name
 * @property string $mime_type
 * @property int $size
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\House $house
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|HousePhoto newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HousePhoto newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HousePhoto query()
 * @method static \Illuminate\Database\Eloquent\Builder|HousePhoto whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousePhoto whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousePhoto whereFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousePhoto whereHouseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousePhoto whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousePhoto whereMimeType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousePhoto whereOriginalName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousePhoto whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HousePhoto whereUpdatedAt($value)
 * @method static \Database\Factories\HousePhotoFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class HousePhoto extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'house_id',
        'filename',
        'original_name',
        'mime_type',
        'size',
        'description',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'house_id' => 'integer',
        'size' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the house that owns this photo.
     */
    public function house(): BelongsTo
    {
        return $this->belongsTo(House::class);
    }
}