@search @google
Feature: Google Search
  As an internet user
  In order to find out more about Keg-Hub
  I want to be able to search for information about the Keg-Hub
  
  Scenario: Search the web for google
    Given I open the site https://www.google.com
    When I set keg-hub to the input .gLFyf
    When I press enter
    When I wait for the page to load
    Then the element #search contains the text simpleviewinc/keg-hub
