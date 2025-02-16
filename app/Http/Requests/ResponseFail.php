<?php

namespace App\Http\Requests;

class ResponseFail {
    public string $status;
    public string $message;
    public mixed $erros;

    public function __construct(mixed $errors, string $status, string $message) {
        $this->status = $status;
        $this->message = $message;
        $this->erros = $errors;
    }
}
