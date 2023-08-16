import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './selectInterest.css';
import './button.css';
import { useNavigate } from 'react-router-dom';
const SelectInterest = ({ onClose }) => {
  const [selectedInterests, setSelectedInterests] = useState([]); // State variable to store selected interests
  const history = useNavigate(); // Navigation hook for handling history

  const handleInterestChange = (event) => {
    const value = event.target.value; // Get the value of the selected interest
    const isChecked = event.target.checked; // Check if the checkbox is checked or unchecked

    if (isChecked) {
      // If the checkbox is checked, add the interest to the selectedInterests state
      setSelectedInterests((prevInterests) => [...prevInterests, value]);
    } else {
      // If the checkbox is unchecked, remove the interest from the selectedInterests state
      setSelectedInterests((prevInterests) =>
        prevInterests.filter((interest) => interest !== value)
      );
    }
  };

  // Rest of the component code...



  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');

    try {
      const response = await axios.post('http://localhost:5000/select', {
        userId: userId,
        interests: selectedInterests,
      });
      // Handle the response if needed
    } catch (error) {
      // Handle the error if needed
    }
    onClose();
    // // Add a delay before navigating to "/profile"
    // setTimeout(() => {
    //   history('/profile', { state: { id: userId } });
    // }, 600);
  };

  useEffect(() => {
    const fetchUserInterests = async () => {
      const userId = localStorage.getItem('userId');

      try {
        const response = await axios.get(`http://localhost:5000/user/${userId}`);
        const { interests } = response.data;
        setSelectedInterests(interests);
      } catch (error) {
        // Handle the error if needed
      }
    };

    fetchUserInterests();
  }, []);
  useEffect(() => {
    const animateButton = function (e) {
      e.preventDefault();
      // reset animation
      e.target.classList.remove('animate');

      e.target.classList.add('animate');
      setTimeout(function () {
        e.target.classList.remove('animate');
      }, 10000);
    };

    const bubblyButtons = document.getElementsByClassName("bubbly-button");

    for (let i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', animateButton, false);

    }
  }, []);
  return (
    //     In the provided code snippet, the comments describe the purpose and functionality of the different parts of the JSX code.
    // The className="Interest" assigns the "Interest" CSS class to the wrapping <div>, allowing for styling and customization.
    // The <fieldset> element represents a group of checkboxes, and the <legend> element provides a title or description for the group. In this case, it indicates that the checkboxes are for editing themes.
    // The wrapping <div> with the class "checkbox" is used to group each checkbox element.
    // The <label> element is used to associate the checkbox with its label text. It contains the checkbox input and the text "Video Game" as the label for that checkbox.

    <div className="Interest">
      <fieldset className="checkbox-group">
        <legend className="checkbox-group-legend">Edit Your Themes</legend>
        <div className="checkbox">

          <label className="checkbox-wrapper">
            <input
              type="checkbox"
              className="checkbox-input"
              value="Gaming"
              checked={selectedInterests.includes('Gaming')}
              onChange={handleInterestChange}
            />
            <span className="checkbox-tile">
              <span className="checkbox-icon">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                  width="192" height="192" viewBox="160 50 550 550"
                  preserveAspectRatio="xMidYMid meet">

                  <g transform="translate(0.000000,650.000000) scale(0.100000,-0.100000)"
                    fill="currentcolor" stroke="none">
                    <path d="M3000 5200 c-25 -4 -92 -15 -150 -24 -249 -38 -435 -113 -540 -217
                    -50 -50 -64 -73 -95 -154 -28 -70 -49 -107 -80 -139 -51 -53 -107 -143 -130
                    -211 -71 -210 -155 -571 -214 -920 -206 -1208 -215 -1272 -216 -1535 0 -175 2
                    -203 23 -275 78 -269 292 -441 525 -423 89 7 184 56 272 140 60 56 84 90 152
                    215 45 81 126 238 179 348 54 110 112 223 129 250 58 91 132 151 209 169 16 4
                    585 7 1265 7 1370 0 1273 5 1377 -66 28 -20 64 -54 81 -78 45 -62 140 -239
                    236 -437 46 -96 112 -215 145 -265 75 -112 178 -212 257 -251 54 -26 70 -29
                    161 -29 98 0 103 1 185 42 147 73 249 204 294 378 54 211 41 454 -60 1050
                    -121 717 -149 877 -190 1080 -68 335 -118 525 -164 622 -45 93 -110 192 -139
                    209 -10 7 -34 54 -52 105 -31 84 -42 101 -105 165 -119 121 -246 171 -570 224
                    -193 32 -239 35 -326 21 -109 -18 -133 -29 -220 -103 l-87 -73 -820 0 -820 1
                    -46 39 c-101 86 -129 105 -179 120 -62 18 -225 27 -287 15z m2893 -626 c73
                    -25 137 -114 137 -190 0 -41 -23 -96 -53 -131 -101 -115 -273 -88 -338 52 -48
                    103 8 231 117 270 51 19 81 18 137 -1z m-2976 -288 c231 -116 228 -443 -5
                    -558 -38 -19 -63 -23 -132 -23 -99 1 -155 22 -219 86 -64 64 -85 120 -86 219
                    0 73 4 92 27 136 34 64 104 127 172 154 70 28 173 22 243 -14z m2567 -99 c65
                    -37 99 -88 104 -156 5 -73 -9 -118 -51 -161 -41 -42 -89 -62 -147 -62 -57 1
                    -97 16 -133 50 -109 103 -81 278 53 336 52 23 128 20 174 -7z m840 13 c40 -15
                    104 -79 116 -116 34 -101 -4 -206 -90 -251 -60 -32 -159 -30 -208 5 -60 43
                    -86 88 -90 157 -6 90 31 155 113 198 34 18 121 22 159 7z m-401 -388 c18 -10
                    46 -37 64 -60 123 -161 -58 -387 -243 -303 -135 61 -164 233 -56 334 61 58
                    165 71 235 29z m-2325 -284 c8 -8 12 -53 12 -135 0 -68 3 -123 8 -123 4 0 60
                    -1 125 -3 147 -3 147 -3 147 -132 0 -134 -1 -135 -156 -135 l-124 0 0 -123 c0
                    -82 -4 -127 -12 -135 -17 -17 -222 -16 -236 1 -7 7 -13 66 -14 133 l-3 119
                    -128 5 c-99 4 -130 8 -137 20 -5 8 -10 58 -10 111 0 134 0 134 142 136 62 1
                    119 2 126 2 9 1 12 33 12 124 0 82 4 127 12 135 8 8 49 12 118 12 69 0 110 -4
                    118 -12z m1600 -118 c106 -53 162 -138 170 -257 8 -130 -57 -242 -175 -299
                    -63 -31 -157 -38 -231 -16 -64 19 -142 88 -177 157 -26 51 -30 69 -29 139 0
                    97 23 151 90 219 58 59 126 86 220 86 60 1 80 -4 132 -29z"/>
                  </g>
                </svg>

              </span>
              <span class="checkbox-label" style={{ marginLeft: '13px' }}>Gaming</span>
            </span>
          </label>
        </div>
        <div class="checkbox">
          <label class="checkbox-wrapper">
            <input type="checkbox" class="checkbox-input" value="Nature" checked={selectedInterests.includes('Nature')} onChange={handleInterestChange} />
            <span class="checkbox-tile">
              <span class="checkbox-icon">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                  width="980.000000pt" height="760.000000pt" viewBox="0 0 980.000000 760.000000"
                  preserveAspectRatio="xMidYMid meet">

                  <g transform="translate(0.000000,760.000000) scale(0.100000,-0.100000)"
                    fill="currentcolor" stroke="none">
                    <path d="M1841 7503 c-185 -747 -580 -1592 -1019 -2178 -91 -121 -147 -188
                -271 -323 -55 -61 -90 -107 -85 -112 5 -5 126 -74 269 -153 190 -106 261 -150
                263 -165 7 -42 -168 -341 -343 -587 -94 -131 -167 -221 -327 -399 -49 -54 -88
                -106 -88 -116 0 -19 8 -24 346 -210 83 -46 161 -90 174 -100 l22 -17 -22 -44
                c-44 -85 -204 -345 -301 -489 -116 -170 -208 -288 -350 -446 -57 -64 -105
                -122 -107 -129 -5 -20 38 -46 234 -143 286 -143 550 -243 784 -298 58 -14 113
                -28 123 -30 16 -5 17 -28 17 -293 0 -159 3 -303 6 -320 l7 -32 90 3 91 3 316
                435 c585 805 1585 2184 1633 2251 l46 66 -80 103 c-153 197 -374 523 -479 709
                -49 87 -52 94 -34 105 10 6 128 73 262 148 133 75 249 142 257 148 22 18 2 48
                -120 180 -503 545 -981 1455 -1230 2341 -26 90 -50 168 -54 172 -5 5 -18 -31
                -30 -80z"/>
                    <path d="M8044 6550 c-154 -77 -241 -138 -355 -250 -166 -165 -291 -379 -350
                -600 -44 -169 -46 -442 -3 -634 53 -238 207 -491 403 -663 181 -159 434 -285
                627 -313 89 -13 379 -12 468 0 151 22 386 120 516 215 127 93 316 296 389 418
                37 62 29 61 -137 -8 -207 -86 -503 -106 -731 -49 -341 86 -637 330 -796 658
                -66 136 -92 226 -106 376 -31 312 20 538 181 806 47 77 61 114 42 114 -5 0
                -71 -31 -148 -70z"/>
                    <path d="M5297 5767 c-105 -130 -1283 -1745 -3027 -4149 l-694 -958 -491 0
                c-271 0 -614 -3 -763 -7 l-272 -6 0 -324 0 -323 4877 0 4876 0 -7 317 c-4 175
                -9 320 -12 323 -3 3 -162 7 -354 10 -192 3 -350 7 -353 10 -2 3 -440 606 -972
                1340 -2030 2800 -2702 3724 -2751 3782 l-23 28 -34 -43z m146 -1672 c339
                -1048 1010 -2212 1676 -2908 170 -178 405 -377 611 -519 24 -16 -44 -17 -1189
                -17 l-1214 -1 5 1843 c3 1013 9 1851 14 1861 6 17 9 14 20 -20 7 -21 41 -129
                77 -239z"/>
                  </g>
                </svg>
              </span>
              <span class="checkbox-label" style={{ marginLeft: '15px' }}>Nature</span>
            </span>
          </label>
        </div>
        <div class="checkbox">
          <label class="checkbox-wrapper">
            <input type="checkbox" class="checkbox-input" value="Creativity" checked={selectedInterests.includes('Creativity')} onChange={handleInterestChange} />
            <span class="checkbox-tile">
              <span class="checkbox-icon">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                  width="7677.000000pt" height="7677.000000pt" viewBox="700 600 6500 6500"
                  preserveAspectRatio="xMidYMid meet">

                  <g transform="translate(0.000000,7677.000000) scale(0.100000,-0.100000)"
                    fill="currentcolor" stroke="none">
                    <path d="M40350 66205 c-159 -36 -282 -106 -392 -223 -155 -165 -252 -409
                    -305 -767 -22 -151 -26 -766 -5 -965 106 -1033 385 -2191 892 -3710 2278
                    -6829 8222 -17582 13906 -25160 1377 -1835 2568 -3275 3752 -4532 203 -216
                    215 -227 235 -214 12 8 918 544 2012 1191 1095 648 1992 1179 1994 1181 5 4
                    -121 397 -231 724 -1252 3700 -3582 8615 -6511 13735 -4541 7939 -9691 14927
                    -12995 17633 -734 602 -1366 971 -1862 1088 -135 32 -388 42 -490 19z"/>
                    <path d="M29225 56969 c-3342 -124 -6684 -1108 -9800 -2887 -2409 -1375 -4593
                    -3167 -6455 -5297 -1047 -1198 -2013 -2550 -2797 -3920 -309 -539 -724 -1346
                    -957 -1860 -1105 -2438 -1706 -4824 -1856 -7365 -41 -700 -41 -1595 0 -2315
                    323 -5642 3025 -11117 7570 -15341 1278 -1187 2754 -2301 4300 -3246 3704
                    -2263 8014 -3679 12395 -4072 1018 -92 1777 -121 2914 -113 754 6 908 10 1476
                    42 3185 181 6332 881 9148 2034 3490 1429 6384 3500 8400 6011 1888 2351 2966
                    5029 3172 7880 48 675 48 1478 -1 1990 -68 722 -243 1368 -523 1937 -183 371
                    -364 652 -625 968 -130 157 -487 513 -651 649 -1070 886 -2517 1494 -4830
                    2030 -600 139 -1129 248 -2468 511 -1085 212 -1566 311 -2107 431 -2893 641
                    -4618 1388 -5857 2536 -476 441 -801 875 -993 1322 -494 1152 -380 2565 387
                    4786 137 396 314 877 608 1655 666 1760 906 2470 1114 3300 403 1609 384 2888
                    -58 3919 -490 1141 -1458 2017 -3009 2722 -2153 980 -4384 1535 -6722 1674
                    -497 29 -1274 38 -1775 19z m1885 -4284 c1226 -110 2331 -544 3175 -1246 125
                    -104 397 -375 496 -494 453 -543 702 -1111 760 -1729 15 -158 7 -468 -16 -616
                    -94 -618 -378 -1168 -854 -1653 -325 -332 -681 -588 -1131 -813 -980 -490
                    -2176 -677 -3370 -528 -1524 190 -2869 919 -3610 1954 -322 451 -520 958 -571
                    1464 -15 151 -6 515 16 650 83 515 291 976 631 1401 165 205 430 457 669 637
                    760 570 1771 916 2880 988 196 12 716 4 925 -15z m-10710 -5039 c928 -117
                    1643 -436 2176 -970 270 -271 463 -561 599 -900 140 -349 198 -657 199 -1046
                    1 -237 -10 -356 -50 -580 -341 -1885 -2252 -3606 -4504 -4054 -423 -85 -714
                    -110 -1165 -103 -334 6 -448 15 -705 58 -1414 236 -2410 1095 -2664 2296 -61
                    289 -77 645 -42 938 94 788 457 1565 1062 2275 120 141 442 464 584 586 1024
                    881 2297 1415 3615 1518 129 10 775 -3 895 -18z m-5200 -10181 c410 -21 935
                    -167 1350 -375 908 -456 1685 -1287 2160 -2311 273 -589 444 -1217 515 -1894
                    22 -209 30 -679 16 -895 -133 -1966 -1251 -3522 -2824 -3930 -302 -78 -511
                    -105 -827 -105 -247 1 -366 11 -590 51 -1275 231 -2432 1183 -3100 2549 -469
                    961 -669 2089 -555 3125 141 1276 705 2375 1575 3069 536 428 1216 687 1890
                    720 142 7 176 7 390 -4z m5715 -10975 c1186 -75 2366 -615 3361 -1538 1036
                    -961 1689 -2182 1846 -3452 18 -144 18 -720 0 -860 -91 -710 -365 -1295 -816
                    -1745 -229 -229 -453 -388 -746 -529 -1175 -566 -2774 -345 -4175 578 -368
                    243 -675 494 -1001 820 -506 507 -881 1026 -1179 1631 -662 1346 -695 2725
                    -91 3743 139 234 369 503 586 684 117 99 321 236 460 311 499 267 1133 396
                    1755 357z m26080 -220 c1303 -110 2360 -722 2946 -1707 680 -1144 608 -2626
                    -192 -3951 -936 -1552 -2706 -2603 -4511 -2681 -748 -32 -1466 108 -2083 409
                    -1061 516 -1735 1456 -1882 2625 -24 195 -24 614 1 815 48 396 135 740 283
                    1115 477 1211 1522 2279 2810 2875 615 283 1233 446 1918 503 97 8 601 6 710
                    -3z m-12879 -4480 c1067 -84 2012 -442 2772 -1049 144 -115 412 -378 536 -527
                    420 -502 675 -1068 772 -1714 21 -144 30 -563 15 -727 -49 -518 -222 -1037
                    -500 -1502 -182 -302 -372 -542 -646 -817 -256 -257 -469 -434 -750 -620
                    -1138 -758 -2634 -1076 -4015 -853 -1672 269 -2996 1270 -3455 2611 -80 234
                    -140 509 -165 757 -13 133 -13 470 0 602 115 1151 810 2216 1920 2944 774 508
                    1711 821 2675 894 161 12 692 13 841 1z"/>
                    <path d="M61015 30856 c-1295 -766 -2050 -1218 -2049 -1228 1 -12 881 -1508
                    1031 -1753 122 -199 322 -429 504 -580 97 -82 270 -198 384 -260 50 -26 92
                    -50 94 -51 1 -1 -8 -18 -22 -36 -13 -18 -51 -78 -84 -133 -509 -849 -554
                    -1907 -136 -3180 369 -1123 944 -1951 1797 -2588 452 -337 931 -600 1961
                    -1076 514 -238 1052 -502 1285 -632 729 -405 1250 -790 1758 -1295 l192 -192
                    92 126 c500 689 974 1625 1246 2462 279 857 400 1666 371 2480 -20 588 -113
                    1110 -294 1655 -330 994 -898 1874 -1752 2716 -993 979 -1966 1507 -2866 1557
                    l-122 7 5 100 c7 143 2 355 -10 465 -29 247 -109 520 -215 738 -48 100 -1085
                    1871 -1114 1904 -4 4 -929 -538 -2056 -1206z"/>
                  </g>
                </svg>
              </span>
              <span className="checkbox-label" style={{ marginLeft: '15px' }}>Creativity</span>
            </span>
          </label>
        </div>
        <div class="checkbox">
          <label class="checkbox-wrapper">
            <input type="checkbox" class="checkbox-input" value="Festivals" checked={selectedInterests.includes('Festivals')} onChange={handleInterestChange} />
            <span class="checkbox-tile">
              <span class="checkbox-icon">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                  width="298.000000pt" height="297.000000pt" viewBox="15 0 258.000000 258.000000"
                  preserveAspectRatio="xMidYMid meet">

                  <g transform="translate(0.000000,297.000000) scale(0.100000,-0.100000)"
                    fill="currentcolor" stroke="none">
                    <path d="M1635 2759 c-228 -196 -587 -369 -917 -443 -163 -36 -235 -46 -402
                    -56 -131 -7 -151 -10 -169 -29 -17 -17 -19 -26 -11 -48 7 -22 18 -30 49 -37
                    33 -7 47 -19 78 -62 21 -30 44 -54 51 -54 8 0 24 25 36 56 24 58 45 74 100 74
                    22 0 37 -11 70 -52 23 -29 47 -53 53 -53 5 0 22 29 36 65 26 64 26 65 75 74
                    l48 8 54 -52 53 -53 11 27 c5 15 15 48 21 73 9 32 18 47 36 54 39 15 49 11
                    104 -36 29 -25 58 -45 65 -45 8 0 17 29 25 75 7 41 18 75 23 75 6 0 29 -10 51
                    -23 36 -21 41 -28 55 -89 8 -37 18 -70 22 -74 4 -3 32 16 63 43 l56 50 51 -12
                    52 -11 21 -64 c12 -35 26 -65 32 -67 6 -2 30 19 54 47 36 43 47 50 78 50 47 0
                    51 -4 85 -77 16 -35 34 -63 40 -63 6 0 31 28 55 61 42 58 44 59 80 53 20 -4
                    37 -10 39 -13 14 -33 65 -111 72 -111 5 0 26 26 47 57 21 31 41 56 46 55 4 -1
                    26 -2 50 -2 41 0 43 -2 75 -60 18 -33 38 -60 45 -60 7 0 28 27 46 60 28 49 40
                    60 60 60 15 0 35 3 47 6 17 4 27 -6 58 -56 21 -34 43 -59 49 -57 7 1 26 29 42
                    60 26 49 34 57 58 57 61 0 99 45 73 85 l-15 23 -358 -1 c-353 0 -493 7 -712
                    39 -119 17 -315 65 -356 86 l-28 15 89 47 c122 65 296 183 372 251 49 44 62
                    63 62 85 0 31 -23 50 -57 49 -10 0 -49 -27 -88 -60z"/>
                    <path d="M1518 1654 c-27 -25 -48 -52 -48 -59 0 -7 -33 -46 -74 -87 -101 -101
                    -106 -119 -106 -389 l0 -207 -27 -6 c-16 -3 -47 -8 -71 -11 -34 -5 -46 -13
                    -58 -36 l-15 -29 -257 2 -257 3 -5 372 c-5 356 -6 373 -26 399 -36 49 -70 68
                    -122 68 -65 0 -111 -28 -139 -84 -23 -43 -23 -51 -23 -402 l0 -358 -80 0 -81
                    0 3 -67 3 -68 1303 -3 1302 -2 0 70 0 69 -77 3 -78 3 -5 372 c-6 421 -2 405
                    -91 451 -67 35 -144 15 -191 -50 -23 -33 -23 -34 -26 -405 l-3 -373 -369 0
                    -369 0 -13 27 c-13 27 -27 33 -120 48 l-38 6 0 202 c0 116 5 219 11 242 14 49
                    127 165 162 165 30 0 117 85 117 114 0 27 -39 66 -66 66 -10 0 -40 -21 -66
                    -46z m-1013 -109 c51 -50 14 -139 -58 -139 -66 0 -103 63 -73 122 18 34 28 40
                    74 41 22 1 41 -7 57 -24z m1980 0 c52 -51 14 -139 -59 -139 -51 0 -81 31 -81
                    85 0 31 6 46 24 60 33 27 86 25 116 -6z m-2002 -447 c78 -41 52 -159 -35 -158
                    -37 1 -59 14 -76 47 -19 35 -14 63 17 94 31 31 59 36 94 17z m1996 -14 c76
                    -64 1 -174 -94 -138 -19 8 -45 55 -45 84 0 30 53 80 83 80 14 0 39 -12 56 -26z"/>
                    <path d="M134 587 c-2 -7 -3 -91 -2 -187 l3 -175 1303 -3 1302 -2 0 190 0 190
                    -1300 0 c-1050 0 -1302 -2 -1306 -13z"/>
                  </g>
                </svg>


              </span>
              <span class="checkbox-label" style={{ marginLeft: '14px' }}>Festivals</span>
            </span>
          </label>
        </div>
        <div class="checkbox">
          <label class="checkbox-wrapper">
            <input type="checkbox" class="checkbox-input" value="Sports" checked={selectedInterests.includes('Sports')} onChange={handleInterestChange} />
            <span class="checkbox-tile">
              <span class="checkbox-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
                  <rect width="256" height="256" fill="none"></rect>
                  <circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle>
                  <path d="M71.0247,205.27116a159.91145,159.91145,0,0,1,136.98116-77.27311q8.09514,0,15.99054.78906" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                  <path d="M188.0294,53.09083A159.68573,159.68573,0,0,1,64.00586,111.99805a160.8502,160.8502,0,0,1-30.15138-2.83671" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                  <path d="M85.93041,41.68508a159.92755,159.92755,0,0,1,78.99267,138.00723,160.35189,160.35189,0,0,1-4.73107,38.77687" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></path>
                </svg>
              </span>
              <span class="checkbox-label" style={{ marginLeft: '14px' }} >Sports</span>
            </span>
          </label>
        </div>
        <div class="checkbox">
          <label class="checkbox-wrapper">
            <input type="checkbox" class="checkbox-input" value="Culinary" checked={selectedInterests.includes('Culinary')} onChange={handleInterestChange} />
            <span class="checkbox-tile">
              <span class="checkbox-icon">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                  width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000"
                  preserveAspectRatio="xMidYMid meet">
                  <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="currentcolor" stroke="none">
                    <path d="M1192 4540 c-48 -30 -72 -75 -72 -140 0 -100 60 -160 160 -160 100 0
                160 60 160 160 0 100 -60 160 -160 160 -37 0 -66 -6 -88 -20z"/>
                    <path d="M1556 4069 c-114 -143 -196 -319 -196 -421 l0 -48 84 0 83 0 6 53 c9
                71 81 215 152 301 l57 68 -58 59 c-32 32 -61 59 -65 59 -3 0 -32 -32 -63 -71z"/>
                    <path d="M632 3980 c-48 -30 -72 -75 -72 -140 0 -100 60 -160 160 -160 100 0
                160 60 160 160 0 100 -60 160 -160 160 -37 0 -66 -6 -88 -20z"/>
                    <path d="M4400 3580 c-217 -100 -511 -233 -653 -298 -151 -68 -275 -131 -297
                -150 -21 -18 -51 -57 -65 -86 -23 -46 -26 -65 -24 -135 1 -45 0 -84 -3 -86 -3
                -3 -25 2 -49 11 -121 43 -395 58 -614 34 -322 -36 -746 -137 -1113 -265 -74
                -26 -136 -44 -140 -41 -3 4 -8 43 -10 89 -7 130 33 257 115 364 l35 46 -58 58
                c-32 33 -61 59 -65 59 -11 0 -91 -114 -119 -171 -58 -113 -74 -183 -75 -314 0
                -66 4 -138 8 -160 l8 -40 -170 -73 c-94 -41 -173 -75 -177 -75 -11 -3 -30 77
                -49 206 -11 71 -18 188 -20 319 -2 202 -3 208 -29 262 -47 97 -131 146 -246
                146 -82 0 -139 -22 -193 -77 -71 -71 -71 -71 -77 -441 -5 -316 -6 -334 -24
                -348 -11 -8 -33 -14 -48 -14 -35 0 -95 -30 -125 -62 -67 -71 -70 -197 -11
                -440 l21 -87 -37 -42 c-63 -74 -96 -152 -96 -229 0 -152 147 -408 342 -595
                325 -313 823 -475 1337 -437 557 42 1060 277 1426 664 231 244 390 554 440
                857 26 151 17 389 -19 526 -14 55 -26 103 -26 107 0 4 16 0 35 -8 19 -8 66
                -14 109 -14 74 0 76 1 263 93 103 52 386 190 628 307 242 118 458 225 480 240
                21 14 53 45 69 68 26 37 31 54 34 117 4 63 0 82 -22 132 -52 112 -124 162
                -236 163 -63 0 -76 -5 -460 -180z m-3752 -486 c40 -28 44 -51 48 -248 7 -441
                94 -760 275 -1007 68 -93 181 -197 279 -257 l82 -51 -43 -11 c-65 -18 -269
                -57 -388 -74 -95 -14 -111 -14 -175 1 -127 29 -212 79 -294 177 -97 115 -181
                348 -185 515 l-2 85 35 9 c19 4 51 12 70 17 42 11 98 62 116 107 11 25 14 103
                14 335 0 177 4 318 10 340 6 20 22 46 37 58 31 24 89 26 121 4z m3068 -84 c11
                0 34 -64 34 -96 0 -28 -8 -44 -34 -70 -44 -44 -59 -44 -40 1 31 76 -36 142
                -112 110 -41 -17 -43 -7 -8 34 33 40 78 53 123 35 18 -8 35 -14 37 -14z m-541
                -316 c98 -20 149 -51 153 -91 4 -42 -26 -99 -87 -164 l-50 -54 -1 40 c-1 79
                -63 167 -142 199 -51 22 -153 20 -203 -3 -22 -10 -57 -36 -77 -59 -38 -42 -49
                -71 -82 -222 -22 -101 -92 -241 -167 -335 -54 -68 -69 -81 -137 -112 -139 -64
                -374 -155 -561 -219 l-184 -62 -71 19 c-237 65 -426 223 -541 453 l-45 88 62
                30 c101 48 289 128 301 128 7 0 22 -17 33 -38 12 -20 36 -54 52 -75 l30 -38
                66 56 66 56 -35 46 c-20 26 -34 51 -32 56 4 12 99 48 277 103 585 183 1097
                256 1375 198z m-175 -244 c14 -14 20 -33 20 -62 0 -58 -25 -148 -47 -169 -18
                -17 -183 -122 -183 -116 0 2 13 39 29 83 16 45 37 119 45 165 18 93 37 119 87
                119 16 0 38 -9 49 -20z m-2757 -862 c14 -24 49 -70 78 -102 l54 -59 -45 7
                c-25 3 -70 19 -100 34 -45 22 -56 32 -58 56 -4 29 25 106 39 106 4 0 18 -19
                32 -42z"/>
                    <path d="M641 1842 l-84 -3 7 -44 c12 -89 88 -203 193 -290 37 -30 70 -55 75
                -55 4 0 28 30 52 66 l44 66 -88 87 c-69 67 -91 96 -102 131 l-13 45 -84 -3z"/>
                    <path d="M1440 2000 l0 -80 80 0 80 0 0 80 0 80 -80 0 -80 0 0 -80z" />
                    <path d="M160 3520 l0 -80 80 0 80 0 0 80 0 80 -80 0 -80 0 0 -80z" />
                    <path d="M1040 3440 l0 -80 80 0 80 0 0 80 0 80 -80 0 -80 0 0 -80z" />
                    <path d="M960 2720 l0 -80 80 0 80 0 0 80 0 80 -80 0 -80 0 0 -80z" />
                  </g>
                </svg>
              </span>
              <span class="checkbox-label" style={{ marginLeft: '14px' }} > Culinary</span>
            </span>
          </label>
        </div>
        <div class="checkbox">
          <label class="checkbox-wrapper">
            <input type="checkbox" class="checkbox-input" value="Adventures" checked={selectedInterests.includes('Adventures')} onChange={handleInterestChange} />
            <span class="checkbox-tile">
              <span class="checkbox-icon">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                  width="820.000000pt" height="760.000000pt" viewBox="20 50 700.000000 700.000000"
                  preserveAspectRatio="xMidYMid meet">
                  <g transform="translate(0.000000,760.000000) scale(0.100000,-0.100000)"
                    fill="currentcolor" stroke="none">
                    <path d="M1650 7184 c-76 -21 -158 -63 -250 -129 -80 -58 -141 -115 -124 -115
                    5 0 82 20 169 45 88 25 163 45 168 45 4 0 7 -83 7 -185 l0 -185 -63 0 c-77 0
                    -200 -30 -284 -69 -153 -72 -285 -210 -351 -368 -46 -109 -52 -160 -52 -483 0
                    -277 2 -312 20 -379 22 -77 64 -171 101 -222 l21 -30 -68 -117 c-37 -64 -99
                    -171 -137 -237 -39 -66 -134 -230 -211 -365 l-141 -245 0 -65 c1 -56 6 -72 34
                    -118 99 -158 388 -294 656 -308 160 -9 275 25 346 103 14 15 131 208 259 428
                    128 220 310 531 403 690 93 160 216 369 272 465 56 96 144 246 194 332 51 87
                    89 162 86 169 -23 36 -272 200 -389 255 -34 16 -42 27 -58 74 -56 170 -186
                    323 -347 408 l-81 44 2 236 3 236 33 8 c41 11 38 25 -14 60 -50 35 -128 44
                    -204 22z m-32 -616 l3 -38 -50 0 c-69 0 -189 -24 -258 -52 -116 -47 -222 -130
                    -316 -248 -28 -34 -27 -34 5 30 40 79 155 202 232 249 102 61 238 101 336 98
                    44 -2 45 -2 48 -39z m358 -94 c69 -48 122 -109 179 -202 43 -70 43 -94 0 -33
                    -58 84 -189 189 -284 227 -38 15 -41 19 -41 55 l0 39 43 -21 c23 -12 70 -41
                    103 -65z m-372 -40 c13 -5 16 -23 16 -94 l0 -87 -92 -6 c-97 -6 -191 -32 -283
                    -80 -106 -54 -235 -181 -290 -287 l-24 -45 -1 36 c-1 94 74 251 168 350 126
                    134 275 203 474 218 9 0 23 -2 32 -5z m321 -97 c49 -31 185 -153 185 -167 0
                    -4 -46 -5 -102 -2 -74 3 -114 10 -140 23 l-38 19 0 86 c0 84 0 85 23 79 12 -4
                    45 -21 72 -38z m-305 -212 l0 -74 -69 -70 c-73 -74 -120 -144 -267 -403 -49
                    -87 -94 -158 -100 -158 -6 0 -43 33 -82 74 -49 52 -83 99 -113 160 l-43 87 47
                    92 c111 219 335 360 580 366 l47 1 0 -75z m-655 -709 c20 -35 57 -87 83 -116
                    l45 -52 -21 -36 c-11 -20 -27 -37 -34 -37 -18 0 -62 85 -86 165 -21 68 -36
                    140 -29 140 3 0 21 -29 42 -64z"/>
                    <path d="M3720 6963 c-169 -30 -342 -165 -415 -325 -24 -52 -58 -168 -52 -175
                    3 -2 394 -50 967 -118 69 -8 197 -24 285 -34 88 -11 162 -18 164 -16 6 7 24
                    196 18 201 -3 3 -56 19 -118 35 -63 16 -131 34 -151 40 -32 8 -40 17 -62 64
                    -72 157 -216 276 -387 319 -60 15 -189 19 -249 9z"/>
                    <path d="M7276 6547 c-17 -30 -349 -619 -481 -852 -34 -60 -124 -220 -200
                    -355 -76 -135 -157 -279 -180 -320 -23 -41 -72 -128 -109 -193 l-67 -117 -123
                    152 c-67 84 -240 303 -385 486 -145 182 -269 332 -277 332 -7 0 -14 -3 -16 -7
                    -3 -9 -644 -632 -742 -724 -70 -65 -306 -333 -306 -348 0 -8 557 -11 1850 -11
                    1613 0 1850 2 1850 14 0 8 -59 163 -131 343 -72 180 -142 357 -156 393 -14 36
                    -47 117 -73 180 -26 63 -132 328 -235 588 -104 259 -191 472 -194 472 -3 0
                    -14 -15 -25 -33z"/>
                    <path d="M3260 6301 c0 -91 16 -159 60 -248 122 -249 410 -369 675 -282 155
                    51 289 178 346 328 21 54 37 141 27 141 -3 0 -104 11 -224 25 -121 14 -277 32
                    -349 40 -71 8 -208 24 -303 35 -250 29 -232 32 -232 -39z"/>
                    <path d="M2957 5706 c-122 -35 -239 -122 -310 -229 -103 -156 -587 -1034 -587
                    -1064 0 -6 30 -29 68 -51 96 -56 493 -290 724 -426 108 -64 201 -116 205 -116
                    5 0 42 62 83 138 40 75 92 171 115 212 23 41 68 121 99 178 31 56 61 102 66
                    102 5 0 35 -35 67 -77 69 -92 240 -266 343 -349 202 -164 398 -268 705 -376
                    l40 -14 22 -254 c12 -140 31 -363 42 -495 12 -132 30 -343 41 -470 11 -126 41
                    -462 65 -745 25 -283 52 -591 60 -685 44 -517 64 -737 67 -739 2 -1 50 3 107
                    7 l104 9 -7 102 c-4 55 -13 171 -21 256 -8 85 -28 313 -45 505 -59 685 -73
                    849 -130 1485 -11 124 -33 385 -50 580 -16 195 -32 378 -36 407 -5 50 -4 52
                    24 67 45 23 109 102 132 162 33 89 36 151 11 234 -19 61 -31 81 -74 124 -46
                    46 -65 56 -177 95 -312 110 -530 261 -725 506 -113 140 -256 391 -288 505 -48
                    167 -217 332 -407 400 -81 29 -258 37 -333 16z"/>
                    <path d="M1939 4192 c-26 -48 -61 -127 -79 -177 -32 -88 -335 -712 -463 -950
                    -249 -468 -632 -1105 -663 -1105 -8 0 -35 -33 -61 -72 -25 -40 -83 -129 -128
                    -198 -44 -69 -98 -152 -118 -185 -21 -33 -75 -114 -122 -180 -137 -194 -195
                    -282 -195 -292 0 -5 24 -25 52 -43 29 -18 76 -47 103 -65 28 -17 172 -107 320
                    -200 149 -92 286 -178 305 -190 132 -86 285 -175 295 -171 17 6 81 117 88 155
                    10 49 -12 88 -101 175 l-81 78 -42 -36 c-24 -20 -46 -36 -50 -36 -4 0 -15 10
                    -24 23 -15 21 -14 23 26 58 30 25 40 41 36 53 -11 28 -35 29 -68 2 -37 -32
                    -50 -32 -68 -4 -12 20 -10 24 28 55 46 39 46 40 26 67 -14 18 -15 18 -51 -9
                    l-36 -28 -20 21 c-26 25 -20 34 44 65 29 15 67 41 85 59 44 47 333 504 333
                    528 0 11 83 170 208 400 16 30 101 186 187 345 87 160 234 428 327 597 l170
                    307 52 -53 c28 -28 78 -67 111 -86 98 -55 255 -163 366 -251 108 -86 336 -303
                    419 -400 l49 -55 -109 -429 c-60 -235 -116 -442 -124 -459 -9 -17 -39 -148
                    -67 -291 -28 -143 -70 -341 -94 -440 -66 -275 -80 -344 -69 -355 5 -5 70 -20
                    144 -34 74 -14 351 -66 615 -115 263 -50 480 -89 482 -88 1 2 10 38 19 80 20
                    92 10 144 -34 175 -23 17 -200 92 -215 92 -3 0 -17 -20 -31 -45 -28 -48 -41
                    -53 -70 -32 -18 13 -18 16 9 61 22 38 25 49 15 61 -22 26 -46 17 -65 -25 -20
                    -44 -30 -48 -62 -25 l-22 15 26 46 26 46 -23 21 c-12 12 -24 18 -26 12 -2 -5
                    -13 -25 -24 -42 -18 -30 -22 -32 -45 -21 -33 15 -32 28 6 64 66 62 76 94 140
                    425 37 195 105 493 179 784 65 259 124 507 130 551 18 138 -2 194 -128 345
                    -245 295 -547 574 -850 785 -2 1 13 31 33 67 l36 66 -23 14 c-29 18 -403 239
                    -478 282 -30 17 -155 91 -278 163 -123 73 -226 132 -230 132 -4 0 -28 -40 -53
                    -88z"/>
                  </g>
                </svg>
              </span>
              <span class="checkbox-label" style={{ marginLeft: '14px' }} >Adventures</span>
            </span>
          </label>
        </div>
        <div class="checkbox">
          <label class="checkbox-wrapper">
            <input type="checkbox" class="checkbox-input" value="Health" checked={selectedInterests.includes('Health')} onChange={handleInterestChange} />
            <span class="checkbox-tile">
              <span class="checkbox-icon">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                  width="227.000000pt" height="222.000000pt" viewBox="0 0 227.000000 222.000000"
                  preserveAspectRatio="xMidYMid meet">
                  <g transform="translate(0.000000,222.000000) scale(0.100000,-0.100000)"
                    fill="currentcolor" stroke="none">
                    <path d="M1691 2209 c-72 -14 -131 -49 -211 -125 l-75 -72 -74 70 c-42 41 -97
                81 -129 97 -51 23 -69 26 -167 26 -100 0 -115 -3 -166 -28 -75 -36 -140 -107
                -168 -183 -19 -49 -22 -73 -18 -144 5 -102 27 -169 82 -258 l40 -67 110 -3
                110 -2 43 70 44 71 17 -23 c10 -13 41 -58 70 -100 28 -43 54 -78 56 -78 3 0
                36 63 75 140 39 77 72 140 75 140 3 0 32 -55 66 -122 34 -67 68 -133 77 -146
                l15 -23 37 36 37 36 183 -1 184 -2 45 59 c114 151 134 295 59 436 -54 101
                -157 174 -278 197 -60 11 -77 11 -139 -1z"/>
                    <path d="M1337 1414 l-68 -136 -76 111 -75 110 -22 -32 c-21 -31 -23 -32 -113
                -37 l-92 -5 37 -44 c50 -60 472 -453 483 -449 15 5 499 479 499 489 0 5 -52 9
                -117 9 l-117 0 -69 -67 c-38 -38 -71 -63 -73 -58 -3 6 -33 63 -67 127 l-63
                117 -67 -135z"/>
                    <path d="M0 610 l0 -430 175 0 175 0 0 430 0 430 -175 0 -175 0 0 -430z" />
                    <path d="M450 617 l0 -362 194 -102 c230 -121 306 -147 426 -147 117 0 171 19
                410 140 240 122 400 215 600 351 123 83 148 105 168 143 28 56 28 84 0 140
                -17 33 -35 51 -68 68 -75 39 -116 29 -337 -81 -187 -94 -190 -96 -206 -139
                -25 -66 -71 -114 -141 -148 -55 -27 -78 -32 -196 -41 -73 -6 -139 -8 -146 -5
                -7 3 -20 16 -30 30 -15 24 -15 28 0 51 16 24 19 25 139 25 146 0 200 15 258
                70 31 29 39 44 39 71 0 85 -53 109 -234 109 l-137 0 -78 45 c-211 122 -292
                145 -505 145 l-156 0 0 -363z"/>
                  </g>
                </svg>
              </span>
              <span class="checkbox-label" style={{ marginLeft: '14px' }} >Health</span>
            </span>
          </label>
        </div>

      </fieldset>
      <button class="bubbly-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SelectInterest;
