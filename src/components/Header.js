import React from 'react'
import styled from 'styled-components/macro'

export default function Header() {
  return (
    <HeaderStyled>
      <h1 role="banner" id="Ciceroic">
        <svg
          aria-labelledby="CiceroicLogo CiceroicLogoDescription"
          role="img"
          width="133.34"
          height="22.766"
          viewBox="0 0 133.34 22.766"
        >
          <title id="CiceroicLogo">Ciceroic – Become a Great Speaker</title>
          <desc id="CiceroicLogoDescription">
            The logo of Ciceroic contains a microphone in place of the first i
            in the word Ciceroic. Ciceroic is a neologism, merged from the name
            of Marcus Tullius Cicero, the politicion from ancient Rome famous
            for his rhetoric skills, on the on hand and "heroic" on the other.
            Thus, Ciceroic helps users in becoming a heroic speaker like Cicero.
          </desc>
          <g
            id="Gruppe_5"
            data-name="Gruppe 5"
            transform="translate(-120.988 -20.027)"
          >
            <path
              id="Pfad_12"
              data-name="Pfad 12"
              d="M17.631,23.285l2.578.651a8.678,8.678,0,0,1-2.917,4.843,8.036,8.036,0,0,1-5.149,1.668,9.253,9.253,0,0,1-5.122-1.282,8.007,8.007,0,0,1-3-3.714,13.251,13.251,0,0,1-1.03-5.222A11.479,11.479,0,0,1,4.151,14.92,7.966,7.966,0,0,1,7.46,11.478,9.667,9.667,0,0,1,12.183,10.3,7.986,7.986,0,0,1,17.1,11.791a7.728,7.728,0,0,1,2.777,4.186l-2.538.6a6.02,6.02,0,0,0-1.967-3.1,5.24,5.24,0,0,0-3.242-.97,6.3,6.3,0,0,0-3.754,1.076,5.684,5.684,0,0,0-2.119,2.89,11.635,11.635,0,0,0-.611,3.741,11.887,11.887,0,0,0,.724,4.338,5.4,5.4,0,0,0,2.252,2.771,6.317,6.317,0,0,0,3.309.917A5.544,5.544,0,0,0,15.6,26.992,6.392,6.392,0,0,0,17.631,23.285Zm29.935,0,2.578.651a8.678,8.678,0,0,1-2.917,4.843,8.036,8.036,0,0,1-5.149,1.668,9.253,9.253,0,0,1-5.122-1.282,8.007,8.007,0,0,1-3-3.714,13.251,13.251,0,0,1-1.03-5.222,11.479,11.479,0,0,1,1.163-5.308,7.966,7.966,0,0,1,3.309-3.442A9.667,9.667,0,0,1,42.118,10.3a7.986,7.986,0,0,1,4.916,1.488,7.728,7.728,0,0,1,2.777,4.186l-2.538.6a6.02,6.02,0,0,0-1.967-3.1,5.24,5.24,0,0,0-3.242-.97,6.3,6.3,0,0,0-3.754,1.076,5.684,5.684,0,0,0-2.119,2.89,11.635,11.635,0,0,0-.611,3.741,11.887,11.887,0,0,0,.724,4.338,5.4,5.4,0,0,0,2.252,2.771,6.317,6.317,0,0,0,3.309.917,5.544,5.544,0,0,0,3.667-1.249A6.392,6.392,0,0,0,47.566,23.285Zm5.807,6.83V10.635H67.458v2.3H55.951V18.9H66.727v2.285H55.951v6.631H67.91v2.3Zm18.138,0V10.635h8.637a11.5,11.5,0,0,1,3.96.525,4.33,4.33,0,0,1,2.166,1.854,5.53,5.53,0,0,1,.811,2.937,4.9,4.9,0,0,1-1.342,3.495A6.792,6.792,0,0,1,81.6,21.251a6.685,6.685,0,0,1,1.555.97,13.394,13.394,0,0,1,2.139,2.591l3.388,5.3H85.436l-2.578-4.053Q81.729,24.308,81,23.378a5.849,5.849,0,0,0-1.309-1.3,3.869,3.869,0,0,0-1.176-.518,7.744,7.744,0,0,0-1.435-.093h-2.99v8.65Zm2.578-10.883H79.63a8.31,8.31,0,0,0,2.764-.365A2.941,2.941,0,0,0,83.908,17.7a3.163,3.163,0,0,0,.518-1.747,2.9,2.9,0,0,0-1-2.272,4.694,4.694,0,0,0-3.169-.89H74.089Zm16.251,1.4a10.586,10.586,0,0,1,2.6-7.594,8.855,8.855,0,0,1,6.724-2.744,9.328,9.328,0,0,1,4.863,1.289,8.418,8.418,0,0,1,3.3,3.594,11.674,11.674,0,0,1,1.136,5.229,11.478,11.478,0,0,1-1.2,5.3,8.165,8.165,0,0,1-3.388,3.541,9.681,9.681,0,0,1-4.73,1.2,9.211,9.211,0,0,1-4.916-1.329,8.551,8.551,0,0,1-3.282-3.628A10.994,10.994,0,0,1,90.34,20.627Zm2.658.04a7.8,7.8,0,0,0,1.894,5.548,6.606,6.606,0,0,0,9.541-.02,8.274,8.274,0,0,0,1.88-5.807,9.979,9.979,0,0,0-.8-4.152,6.177,6.177,0,0,0-2.352-2.751,6.376,6.376,0,0,0-3.475-.977,6.591,6.591,0,0,0-4.711,1.88Q93,16.269,93,20.667Zm19.732,9.448V10.635h2.578v19.48Zm21.021-6.83,2.578.651a8.678,8.678,0,0,1-2.917,4.843,8.037,8.037,0,0,1-5.149,1.668,9.253,9.253,0,0,1-5.122-1.282,8.007,8.007,0,0,1-3-3.714,13.251,13.251,0,0,1-1.03-5.222,11.479,11.479,0,0,1,1.163-5.308,7.966,7.966,0,0,1,3.309-3.442A9.667,9.667,0,0,1,128.3,10.3a7.986,7.986,0,0,1,4.916,1.488A7.729,7.729,0,0,1,136,15.976l-2.538.6a6.02,6.02,0,0,0-1.967-3.1,5.24,5.24,0,0,0-3.242-.97,6.3,6.3,0,0,0-3.754,1.076,5.684,5.684,0,0,0-2.119,2.89,11.635,11.635,0,0,0-.611,3.741,11.887,11.887,0,0,0,.724,4.338,5.4,5.4,0,0,0,2.252,2.771,6.317,6.317,0,0,0,3.309.917,5.544,5.544,0,0,0,3.667-1.249A6.392,6.392,0,0,0,133.751,23.285Z"
              transform="translate(118 11.671)"
              fill="#003"
            />
            <g
              id="mic-1296056"
              transform="matrix(0.951, 0.309, -0.309, 0.951, 144.749, 20.027)"
            >
              <path
                id="Pfad_1"
                data-name="Pfad 1"
                d="M3.207,0A3.176,3.176,0,0,0,0,3.143c0,.069.007.136.011.2a15.094,15.094,0,0,0,6.323.091c.006-.077.015-.152.016-.231A3.176,3.176,0,0,0,3.207,0ZM6.285,3.8c-1.491.614-4.429.338-6.21.038a3.17,3.17,0,0,0,1.08,1.778s0,.005.005.005a13.615,13.615,0,0,0,1.993.167,11.94,11.94,0,0,0,1.993-.134A3.166,3.166,0,0,0,6.285,3.8ZM1.155,5.968c.258,3.925.592,10.556.86,14.467,0,.236.512.434,1.144.441S4.3,20.7,4.3,20.462c.329-3.92.516-10.545.838-14.467H5.135l-.005.011c-.225.03-.459.055-.7.075H4.421c-.414.033-.843.048-1.289.043s-.866-.03-1.273-.07H1.853c-.24-.024-.472-.051-.7-.086ZM2.374,20.951l.011.51a.422.422,0,0,0,.424.414l.757-.005a.4.4,0,0,0,.408-.414l-.011-.489A2.384,2.384,0,0,1,2.374,20.951Z"
                transform="translate(0 0)"
                fill="#a00"
              />
            </g>
          </g>
        </svg>
      </h1>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: var(--primary-bg-color); */
  background: var(--light-grey);
  color: var(--inverse-primary-font-color);
  height: 100%;

  h1 {
    margin: 0;
    padding: 0;
  }
`
