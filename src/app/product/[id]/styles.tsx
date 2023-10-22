'use client'

import styled from 'styled-components'
import Image from 'next/image'
import { Button } from '@styles/globals'
import { breakpoints } from '@breakpoints'

export const ProductContainer = styled.article`
  display: grid;
  grid-template-columns: 448px 1fr;
  gap: 2rem;
  padding: 2rem;
  margin: 0 auto;
  color: var(--gray);

  @media screen and (max-width: ${breakpoints.product.medium}) {
    grid-template-columns: auto;
    justify-content: center;
    margin: initial;
    gap: 1rem;
    padding-top: 0;
    padding-bottom: 0;
  }
`

export const ProductImage = styled(Image)`
  max-width: 90vw;

  @media screen and (max-width: ${breakpoints.product.medium}) {
    height: auto;
    margin: 0 auto;
  }
`

export const ProductDetails = styled.section`
  /* display: flex;
  flex-direction: column;
  gap: 1rem; */
  max-width: 600px;

  @media screen and (max-width: ${breakpoints.product.medium}) {
    align-items: center;
    text-align: center;
  }
`

export const ProductName = styled.h1`
  font-size: 1.8rem;
`

export const ProductButton = styled(Button)`
  background-color: var(--gray);
  width: fit-content;
  padding: 0.7rem 1rem;
  border-radius: var(--border-radius);
  text-transform: uppercase;
`

export const ProductStatus = styled.p`
  color: red;
  font-size: 1.2rem;
`

export const ProductReviews = styled.section`
  margin-top: 1rem;
  gap: 1.5rem;
`
