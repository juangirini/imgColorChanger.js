/**
* Image Color Changer
*
*
* @copyright Juan Girini 2015
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* @author Juan Girini <juan.girini@gmail.com>
* @link https://github.com/juangirini/imgColorChanger.js
* @version 1.0
*/

ImgColorChanger = {
    canvas: document.createElement("canvas"),
    ctx: null,
    originalPixels: null,
    currentPixels: null,
    hexToRGB: function (Hex)
    {
        var Long = parseInt(Hex.replace(/^#/, ""), 16);
        return {
            R: (Long >>> 16) & 0xff,
            G: (Long >>> 8) & 0xff,
            B: Long & 0xff
        };
    },
    changeColor: function (img, color)
    {
        var $this = this;
        this.ctx = $this.canvas.getContext("2d");
        $this.getPixels(img);
        if (!$this.originalPixels)
            return; // Check if image has loaded
        var newColor = $this.hexToRGB(color);

        for (var I = 0, L = $this.originalPixels.data.length; I < L; I += 4)
        {
            if ($this.currentPixels.data[I + 3] > 0)
            {
                $this.currentPixels.data[I] = $this.originalPixels.data[I] / 255 * newColor.R;
                $this.currentPixels.data[I + 1] = $this.originalPixels.data[I + 1] / 255 * newColor.G;
                $this.currentPixels.data[I + 2] = $this.originalPixels.data[I + 2] / 255 * newColor.B;
            }
        }

        $this.ctx.putImageData($this.currentPixels, 0, 0);
        img.src = $this.canvas.toDataURL("image/png");
    },
    getPixels: function (img)
    {
        var $this = this;
        $this.canvas.width = img.width;
        $this.canvas.height = img.height;

        $this.ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, img.width, img.height);
        $this.originalPixels = $this.ctx.getImageData(0, 0, img.width, img.height);
        $this.currentPixels = $this.ctx.getImageData(0, 0, img.width, img.height);

        img.onload = null;
    }
};