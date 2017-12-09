// https://material-ui-next.com/style/typography/
import React from 'react'
import Typography from 'material-ui/Typography'

const build = type => props => <Typography type={type} {...props} />

export const Display4 = build('display4')
export const Display3 = build('display3')
export const Display2 = build('display2')
export const Display1 = build('display1')
export const Headline = build('headline')
export const Title = build('title')
export const Subheading = build('subheading')
export const Body2 = build('body2')
export const Body1 = build('body1')
export const Caption = build('caption')
export const Button = build('button')
