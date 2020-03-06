Feature: The page should load correctly.

Scenario: Open the app
  Given I've navigated to the home page
  Then I should see the say hello page

Scenario: Say Hello with a short text
  Given I've navigated to the home page
  When I enter a short text
  Then I cannot say hello

Scenario: Say Hello with a weird text
  Given I've navigated to the home page
  When I enter a weird text
  Then I cannot say hello

Scenario: Say Hello with a long text
  Given I've navigated to the home page
  When I enter a long text
  Then I can say hello

Scenario: See latest greetings
  Given I've navigated to the home page
  When I click on last greetings
  Then I should see the last greetings page
