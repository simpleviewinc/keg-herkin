@example
Feature: Example Feature!!! 
  As an internet user
  I want to navigate to google
  
  Scenario: Search the web for google
    Given I navigate to https://www.google.com
    When I set keg-hub to the input .gLFyf
    When I press enter
    When I wait for the page to load
    Then the element #search contains the text simpleviewinc/keg-hub
