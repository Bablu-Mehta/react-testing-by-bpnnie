import {render, screen} from '@testing-library/react'

import Options from '../Options';
import { expect } from 'vitest';

test('should displays image for each scoop option from server', () => { 
    render(<Options optionType={"scoops"} />);

    //find images
   const scoopImages = screen.getAllByRole('img', {name: /scoops$/i});
   expect(scoopImages).toHaveLength(2);

   //confirm alt text of the images
   const altText = scoopImages.map(element => element.alt);
   expect(altText).toEqual(['Chocolate scoop', 'Vanilla Scoop']);
 })