<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Weather extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'conditions',
    ];

    protected $casts = [
        'conditions' => 'json',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }


}
