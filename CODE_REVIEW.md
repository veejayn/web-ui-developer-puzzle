Code Smells Found:
 1) Added Type Notation to make use TypeScript Advantage, to make "item" being of Type : <any> to "ReadingListItem". [FIXED][File: reading-list.component.ts, Line:16]
 2) Need to make the book search of async pipe to avoid memory leak because it didn't unsubscribe after subscribing. [FIXED][File: book-search.component.ts, Lines: 36-38, 20]
 3) Added alt text for image tags incase images are not loaded it helps browsers to read and identify images. [FIXED] [Files: book-search.component.html, reading-list.component.html, Lines: ]


Accessibility Fixes From LightHouse:
1) Added Aria Label to Search Icon button in the book search Bar. [FiXED][File: book-search.component.html, Line: 10]
2) Fixed the contrast issue with "Reading List" Button on top right corner, by picking a brighter color from Variable.scss file. [FIXED][File: app.component.scss]
3) Fixed Background and foreground colors do not have a sufficient contrast ratio, by picking brighter grayscale (gray60). [FIXED][File: book-search.component.scss]

Improvements:
1) Added Tags, Scope and Platform in nx.json for lint errors and enforced all these rules in tslint.json. [FIXED]
2) Improved code to use ngSubmit for search books button submit and remove book from reading list. [FIXED]
3) Added Native elements for Anchor tag by pvoiding tabIndex and role. [FIXED]
4) other thoughts on improvements are adding all hardcoded labels into a statics file access from single location.
5) Since this is heavy read Application its good to have cache mechanism, which is good performance standard for read heavy Apps.
6) Label Tag before <input> is missing can be incase for visually impaired, this also comes under accessibility.

Manual Accessibility Check and Fixes:
1) Custom controls have ARIA roles by adding "role" and "aria-checked" inorder to convey its state. [FIXED]
2) Added alt text for the all the images which is good practise incase images are links and browser understand them better and also helps the accessibility. [FIXED]
3) Added tabindex for elements for navigation, also added alt tag for images incase of accessesiblity issue. [FIXED]
4)Label Tag before <input> is missing can be incase for visually impaired, this also comes under accessibility.

- Fixed testcases as its missing few scenarios on reading-list.reducer file.


Task 2:
--> Implemented the instant search by using valuesChanges() over keyup because it is listening to the change to the searchform, basically if the change is
    either through DOM or programatically it will be noticed.

--> Implemented instant search test case.
