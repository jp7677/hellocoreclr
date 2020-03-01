Feature: The page should load correctly.

Scenario: Say Hello
  Given I've navigated to the home page
  Then I should see the say hello page

Scenario: See latest greetings
  Given I've navigated to the home page
  When I click on last greetings
  Then I should see the last greetings page
