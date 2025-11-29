<?php

namespace App\Twig;

use Twig\Extension\AbstractExtension;
use Twig\Extension\GlobalsInterface;

class ThemeExtension extends AbstractExtension implements GlobalsInterface
{
    private string $theme;

    public function __construct(string $theme)
    {
        $this->theme = $theme;
    }

    public function getGlobals(): array
    {
        return [
            'current_theme' => $this->theme,
        ];
    }
}
