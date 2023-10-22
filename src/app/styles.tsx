'use client'

import styled from 'styled-components'
import { breakpoints } from '@breakpoints'

export const ProductContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`

export const FlexGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  @media screen and (max-width: ${breakpoints.home.small}) {
    flex-direction: column;
    padding: 0 2rem;
  }
`

export const SearchFailText = styled.p`
  text-align: center;
`
