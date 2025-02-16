<?php

namespace App\Http\Requests;
/**
 * @template T
 */
class ResponseSuccess {
    /** @var T */
    public mixed $data;
    public string $status;
    public string $message;

    public function __construct(mixed $data, string $status, string $message) {
        $this->status = $status;
        $this->data = $data;
        $this->message = $message;
    }
}
