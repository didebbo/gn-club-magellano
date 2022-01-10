<?php
class Path
{

    public $currentPath;

    function __construct($path)
    {
        $this->currentPath = $path;
        echo "Current Path: " . $this->currentPath . "\n";
    }

    public function cd($newPath)
    {
        $innerCounter = 0;
        $strOut = '';
        $newPath = explode('/', $newPath);
        $echoNewPath = '';
        $oldPath = explode('/', $this->currentPath);

        foreach ($newPath as $index => $str) {
            $echoNewPath .= $str;
            if ($index < count($newPath) - 1) $echoNewPath .= '/';
            // echo $str.'/';
            if ($str == '..') $innerCounter++;
        }
        echo 'New Path: ' . $echoNewPath . "\n";

        $oldLength = count($oldPath);
        for ($i = 0; $i < ($oldLength - $innerCounter); $i++)
            $strOut .= $oldPath[$i] . "/";

        // $newLength = count($newPath);
        foreach ($newPath as $index => $str) {
            if ($str != '..') {
                $strOut = $strOut . $str;
                if ($index < count($newPath) - 1) $strOut .= '/';
            }
        }

        $this->currentPath = $strOut;
        echo "Current Path: " . $this->currentPath . "\n";
    }
}

$path = new Path('/a/b/c/d');
$path->cd('../x/y');
