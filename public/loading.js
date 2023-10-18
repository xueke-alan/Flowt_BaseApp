console.log(1234);
console.log(document.querySelector("#app"));
document.querySelector("#app").innerHTML = `
<style>
    .first-loading-wrap {
        /* background-color: green; */

        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0px;
        left: 0px;
    }

    .first-loading-wrap .first-loading-wrap-content {
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

    }

    .first-loading-wrap .first-loading-wrap-content .footer {
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 400;
        color: #848484;
        margin-bottom: 50px;
        line-height: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .first-loading-wrap .title,
    .first-loading-wrap .subtitle {
        font-size: 20px;
        font-weight: light;
        /* font-style: italic; */
        opacity: 1;
        font-family: Arial, Helvetica, sans-serif;
        /* transition: max-width .5s var(--n-bezier) .3s, opacity .5s var(--n-bezier) .3s, margin-left .5s var(--n-bezier) .3s; */
        user-select: none;
        color: #ff6600;
        margin: 0;
        margin-left: 20px;
        margin-top: 38px;
        line-height: 40px;
        height: 40px;
        padding: 0;
    }


    .first-loading-wrap .logo {
        width: 220px !important;
        height: 120px !important;
        border-radius: 100px;
        flex: 1;
        display: flex;
        /* padding: 20px; */
        animation: pulse-animation 2s infinite .5s;
        /* border: 1px solid rgba(0, 0, 0, 0.1); */
    }

    .first-loading-wrap .loading-wrap {
        padding: 98px;
        display: flex;
        justify-content: center;
        align-items: center
    }

    @keyframes pulse-animation {
        0% {
            opacity: 1;
            ;
        }

        50% {
            opacity: .5;
            ;
        }

        100% {
            opacity: 1;
            ;
        }
    }
</style>

<div class="first-loading-wrap">
    <div class="first-loading-wrap-content">
        <div class="logo">
            <svg viewBox="0 0 100 47" fill="none" xmlns="http://www.w3.org/2000/svg"
                class="LogoComponent_a-logo-component__svg__qyebU" type="primary" title="SGS">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M86.663 13.928c-.446-5.188-3.672-7.498-9.581-7.486-8.244.019-10.66 4.023-10.665 9.068 0 5.398 4.305 7.873 8.074 10.04 2.932 1.685 5.538 3.183 5.538 5.725 0 2.193-1.119 3.663-3.398 3.663-3.718 0-3.855-2.586-3.855-5.672h-6.76c-.288 4.47.659 8.51 5.337 9.944h9.428c2.793-.751 5.164-2.463 5.88-6.235v-4.672c-.928-4.2-4.596-6.178-7.86-7.938-2.93-1.58-5.534-2.984-5.534-5.662 0-2.23 1.303-3.435 3.496-3.435 2.731 0 3.322 2.514 3.317 4.865h6.584v-2.205zM25.606 39.213c-4.678-1.435-5.625-5.475-5.339-9.945h6.762c0 3.086.133 5.672 3.85 5.672 2.284 0 3.403-1.47 3.403-3.662 0-2.543-2.606-4.04-5.537-5.726-3.768-2.166-8.073-4.642-8.073-10.04 0-5.049 2.417-9.07 10.659-9.07 6.58 0 9.848 2.949 9.402 9.691H34.15c0-2.412-.4-4.865-3.134-4.865-2.19 0-3.491 1.204-3.491 3.435 0 2.678 2.603 4.082 5.533 5.663 3.77 2.034 8.082 4.36 8.082 10.065 0 5.586-2.745 7.877-6.102 8.78h-9.432v.002zm31.982-22.317c.047-2.996-.449-5.626-4.031-5.626-4.208 0-4.208 5.672-4.208 11.926 0 10.093.986 11.881 4.836 11.881 1.119 0 2.329-.27 3.357-.627v-7.147h-3.67v-4.956h10.43v16.35c-.717.139-1.85.332-3.13.515H49.606c-6.264-1.558-7.109-6.518-7.109-16.372 0-8.135.405-16.396 11.463-16.396 6.628 0 10.75 3.71 10.345 10.452h-6.716z"
                    fill="#848484"></path>
                <path d="M0 39.212h100v.777H0v-.776z" fill="#F60"></path>
                <path d="M86.664 0h.78v46.654h-.78V0z" fill="#F60"></path>
            </svg>
        </div>
        <div class="footer">
            <div>首次加载可能需要一点时间，请耐心等待...</div>
        </div>
    </div>
</div>`;