// content.js

(function () {
  const appendVolumeController = () => {
    const parent = document.querySelector("section > main > div > div:nth-child(2) > div");
    if (!parent || document.getElementById('vol_controller')) return;

    // Create the volume controller
    const controller = document.createElement('div');
    controller.id = "vol_controller";
    controller.innerHTML = `
      <style>
        div[data-instancekey] {
          pointer-events: none;
        }

        div#vol_controller {
          position: fixed;
          bottom: 1rem;
          width: 20rem;
        }

        div#vol_controller > div.input > label {
          font-size: 1rem !important;
        }


        div#vol_controller > div.input {
          display: flex;
          flex-direction: column;
          padding: 1rem;
          box-sizing: border-box;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          border-radius: 10px;
          z-index: 9999;
        }

        div#vol_controller > div.input > input {
          padding: 0.5rem 0;
          appearance: none;
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
          position: relative;
          overflow: hidden;
        }

        div#vol_controller > div.input > input::-webkit-slider-thumb {
          -webkit-appearance: none;
          border: 1px solid #000;
          height: 1.5rem;
          width: 0.5rem;
          border-radius: 0.25rem;
          background: #008eea;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
        }

        div#vol_controller > div.input > input::-webkit-slider-runnable-track {
          width: 100%;
          height: 0.5rem;
          background: #ffffff;
          cursor: pointer;
          border-radius: 0.5rem;
        }

        div#vol_controller > div.input > input:before {
          content: '';
          position: absolute;
          left: 0;
          height: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          width: var(--percent);
          background: var(--accent);
          border-radius: 0.5rem;
        }
      </style>
      <div class="input">
        <label for="vol">Lautstärke:</label>
        <input id="volumeSlider" type="range" min="0" max="100" style="--percent: 46%;" value="46">
      </div>
    `;

    parent.appendChild(controller);

    // Add event listener to the slider
    const slider = controller.querySelector('#volumeSlider');
    slider.addEventListener('input', (event) => {
      const value = event.target.value;
      event.target.style.setProperty('--percent', `${value}%`);
      setVideoVolume(value / 100);
    });
  };

  const setVideoVolume = (volume) => {
    console.log('volume set to :'+volume);
    document.querySelectorAll('video').forEach(video => {
      console.log(video);
      video.volume = volume;
    });
  };

  const observeMutations = () => {
    const observer = new MutationObserver(() => {
      appendVolumeController();
      setVideoVolume(document.querySelector('#volumeSlider')?.value / 100 || 0.46);
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  // Initialize the functionality
  appendVolumeController();
  observeMutations();
})();