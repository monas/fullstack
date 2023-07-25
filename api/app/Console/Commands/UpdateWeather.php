<?php

namespace App\Console\Commands;

use App\Jobs\FetchWeatherInformation;
use App\Models\User;
use Illuminate\Console\Command;

class UpdateWeather extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'weather:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync weather information form the API';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $userList = User::all();
        foreach($userList as $key => $user) {
            FetchWeatherInformation::dispatch($user);
        }
    }
}
