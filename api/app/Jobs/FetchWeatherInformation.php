<?php

namespace App\Jobs;

use App\Events\WeatherUpdated;
use App\Models\User;
use App\Models\Weather;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class FetchWeatherInformation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public User $user)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // grab user's weather
        $response = Http::get(env('WEATHER_API_URL') . '/data/2.5/weather?lat=' . $this->user->latitude . '&lon=' . $this->user->longitude . '&appid=' . env('WEATHER_API_KEY') .'&units=' . env('WEATHER_API_UNITS'));

        if (!$response || !$response->json()) {
            return;
        }

        // store it into db
        $entry = Weather::create([
            'user_id' => $this->user->id,
            'conditions' => $response->json()
        ]);

        // let other know about it
        WeatherUpdated::dispatch($entry);

        // clear weather table - leave only last 3 entries
        Weather::where('user_id', $this->user->id)->orderByDesc('id')->get()->skip(3)->each(function($row){ $row->delete(); });
    }
}
